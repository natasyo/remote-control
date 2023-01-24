import { RawData, WebSocket, WebSocketServer } from "ws";
import { mouse, left, right, up, down, Point } from "@nut-tree/nut-js";

export async function moove(data: RawData, ws: WebSocket) {
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
    case "position":
      const position: Point = await mouse.getPosition();
      console.log(position);
      ws.send(`mouse_position ${position.x}px,${position.y}px`);
      break;
    default:
      break;
  }
}
