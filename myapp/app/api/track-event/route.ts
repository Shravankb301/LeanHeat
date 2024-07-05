// Adjusted import statements to use NextApiRequest and NextApiResponse
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import cors, { runMiddleware } from '@/lib/corsMiddleware';

// Helper function to run the middleware
const runMiddlewareAsync = (req: NextApiRequest, res: NextApiResponse, fn: Function) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// // Adjust the GET function to use NextApiRequest and NextApiResponse
// export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
//   await runMiddlewareAsync(req, res, cors);

//   try {
//     const trackingData = await prisma.trackingEvent.findMany();
//     res.status(200).json({ success: true, data: trackingData });
//   } catch (error) {
//     console.error('Error fetching tracking data:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// };

// Adjust the POST function to use NextApiRequest and NextApiResponse
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddlewareAsync(req, res, cors);

  try {
    const data = req.body;

    const { type, url, element, id, classes, timestamp } = data;

    if (typeof type !== 'string' || typeof url !== 'string') {
      return res.status(400).json({ success: false, message: 'Bad Request: Invalid data types' });
    }

    const result = await prisma.trackingEvent.create({
      data: {
        type,
        url,
        element,
        elementId: id,
        elementClasses: classes,
        timestamp: new Date(timestamp),
      },
    });

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error tracking event:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
