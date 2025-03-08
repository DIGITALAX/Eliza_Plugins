import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { spawn } from "child_process";
import net from "net";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import sqlite3 from "better-sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "./../../.env") });
const projectRoot = path.resolve(__dirname, "../../");

const app = express();
const PORT = 5000;
const activeSessions = new Map();

app.use(express.json());
app.use(cors());

async function findAvailablePort(
    startPort = 3000,
    maxPort = 4000
): Promise<number> {
    for (let port = startPort; port < maxPort; port++) {
        if (await checkPortAvailable(port)) return port;
    }
    throw new Error("No available ports found!");
}

function checkPortAvailable(port: number): Promise<boolean> {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.once("error", () => resolve(false));
        server.once("listening", () => {
            server.close();
            resolve(true);
        });
        server.listen(port);
    });
}

function closeSession(sessionId: string): void {
    console.log(`❌ Cerrando sesión ${sessionId}`);
    const session = activeSessions.get(sessionId);
    if (session) {
        process.kill(-session.process.pid);

        const dbPath = path.resolve(__dirname, "../data", session.dbName);
        if (fs.existsSync(dbPath)) {
            console.log(`🗑️ Eliminando base de datos: ${dbPath}`);
            fs.unlinkSync(dbPath);
        } else {
            console.warn(`⚠️ Base de datos no encontrada: ${dbPath}`);
        }

        console.log(`🔓 Liberando puerto ${session.port}`);
        try {
            execSync(`fuser -k ${session.port}/tcp`);
        } catch (err) {
            console.warn(
                `⚠️ No se pudo liberar el puerto ${session.port}. Puede que ya esté libre.`
            );
        }

        activeSessions.delete(sessionId);
    }
}

app.post("/connect", async (req: Request, res: Response) => {
    try {
        const apiKey = req.headers["x-api-key"];

        if (apiKey !== process.env.RENDER_API_KEY) {
            res.status(403).json({ error: "Unauthorized: Invalid API Key" });
            return;
        }

        const sessionId = uuidv4();
        const port = await findAvailablePort();
        const dbName = `db_${sessionId}.sqlite`;
        const startTime = Date.now();

        console.log(`🔥 Nueva sesión iniciada: ${sessionId} en puerto ${port}`);
        const agentProcess = spawn(
            "pnpm",
            ["start-agent", "--port", port.toString(), "--dbName", dbName],
            {
                cwd: projectRoot,
                detached: true,
                stdio: "ignore",
            }
        );

        agentProcess.unref();
        activeSessions.set(sessionId, {
            process: agentProcess,
            port,
            dbName,
            startTime,
        });

        res.json({ message: "Agente iniciado", sessionId, port });
    } catch (error) {
        console.error("Error starting agent:", error);
        res.status(500).json({ error: "Failed to start agent" });
    }
});

app.post("/disconnect", (req: any, res: any) => {
    const { sessionId } = req.body;

    if (!sessionId || !activeSessions.has(sessionId)) {
        return res.status(400).json({ error: "Invalid session ID" });
    }

    closeSession(sessionId);

    res.json({ message: "Agente cerrado", sessionId });
});

setInterval(
    () => {
        console.log("🕒 Revisando sesiones activas...");
        const now = Date.now();
        const MAX_SESSION_DURATION = 60 * 60 * 1000;

        activeSessions.forEach((session, sessionId) => {
            const dbPath = path.resolve(__dirname, "../data", session.dbName);

            if (!fs.existsSync(dbPath)) {
                console.warn(
                    `⚠️ Base de datos no encontrada para sesión ${sessionId}`
                );
                return;
            }

            try {
                const db = new sqlite3(dbPath);
                const row = db
                    .prepare(
                        "SELECT createdAt FROM memories ORDER BY createdAt DESC LIMIT 1"
                    )
                    .get();

                if (!row) {
                    console.warn(
                        `⚠️ No hay mensajes en memories para sesión ${sessionId}`
                    );
                    return;
                }

                const lastMessageTime = new Date(
                    (row as any).createdAt
                ).getTime();
                if (now - lastMessageTime > MAX_SESSION_DURATION) {
                    console.log(
                        `⏳ Último mensaje de ${sessionId} fue hace más de 1 hora, cerrando...`
                    );
                    closeSession(sessionId);
                }

                db.close();
            } catch (err) {
                console.error(
                    `🚨 Error verificando la base de datos de ${sessionId}:`,
                    err
                );
            }
        });
    },
    5 * 60 * 1000
);

app.listen(PORT, () => {
    console.log(`✅ Servidor API listo en puerto ${PORT}`);
});
