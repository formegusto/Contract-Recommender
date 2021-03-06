import express from "express";
import moment from "moment";
import { Socket } from "socket.io";
import RecoProcessModel from "../../models/recoProcess";

class ProcessRoutes {
  routes: express.Router;

  constructor() {
    this.routes = express.Router();
    this.SetRoutes();
  }

  SetRoutes() {
    this.routes.get(
      "/",
      async (req: express.Request, res: express.Response) => {
        const recoProcess = await RecoProcessModel.find(
          {},
          {
            title: 1,
            minPer: 1,
            maxPer: 1,
            kwh: 1,
            step: 1,
            recoPercentage: 1,
            meanAnalysis: { positiveCount: 1 },
          }
        ).sort({
          createdAt: -1,
        });

        return res.status(200).json({
          status: true,
          data: recoProcess,
        });
      }
    );

    this.routes.get(
      "/:id",
      async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        const recoProcess = await RecoProcessModel.findById(id);

        return res.status(200).json({
          status: true,
          data: recoProcess,
        });
      }
    );

    this.routes.patch("/", (req: express.Request, res: express.Response) => {
      const body = <UpdateProcess>req.body;

      const socket = req.app.get("socket") as Socket;
      socket.emit("alert", {
        ...body,
      });

      return res.status(200).json({
        status: true,
        message: "해당 프로세스가 업데이트 되었습니다.",
      });
    });
  }
}
export default new ProcessRoutes().routes;
