import { NextResponse } from "next/server";
import { prisma } from "../../db";

export async function GET(req: Request, res: Response) {
  if (req.method === 'GET') {
    try {
      const memories = await prisma.memory.findMany({
        where: {
          date: {
            gte: new Date('2019-01-01'),
            lte: new Date(),
          },
        },
        orderBy: {
          date: 'asc',
        },
      });

      return Response.json({ memories }, {status:200})
    } catch (error) {
      console.error('Error fetching memories:', error);
      return Response.json({"Error fetching memories:": error}, {status:500})
    }
  } else {
    return Response.json({"Method Not Allowed:": 405}, {status:405})
  }
}