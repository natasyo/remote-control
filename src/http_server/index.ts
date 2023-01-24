import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import { RawData, WebSocketServer } from "ws";

import { mouse, left, right, up, down } from "@nut-tree/nut-js";

export const httpServer = http.createServer(function (req, res) {
  const __dirname = path.resolve(path.dirname(""));
  const file_path =
    __dirname +
    (req.url === "/" ? "/src/front/index.html" : "/src/front" + req.url);
  fs.readFile(file_path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

const wss = new WebSocketServer({ server: httpServer });
wss.on("connection", (ws) => {
  ws.on("message", async function message(data) {
    console.log("received: %s", data);
    await moove(data);
  });

  ws.send("something");
});

async function moove(data: RawData) {
  let [command, offset] = data.toString().split(" ");
  command = command.replace("mouse_", "");

  switch (command) {
    case "left":
      await mouse.move(left(Number(offset)));
      break;
    case "right":
      await mouse.move(right(Number(offset)));
      break;
    case "up":
      await mouse.move(up(Number(offset)));
      break;
    case "down":
      await mouse.move(down(Number(offset)));
      break;
    default:
      break;
  }
}
// moove()
