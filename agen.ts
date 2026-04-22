import { Router, type IRouter } from "express";

const router: IRouter = Router();

async function handleAgent(query: string): Promise<string> {
  if (!query || typeof query !== "string") {
    return "No query provided.";
  }
  
  // Try to evaluate simple math expressions
  try {
    // Simple math evaluation for expressions like "10+15"
    const result = Function('"use strict"; return (' + query + ')')();
    if (typeof result === 'number') {
      return `The result is ${result}.`;
    }
  } catch (e) {
    // If it's not a math expression, just echo it back
  }
  
  return `You asked: ${query}`;
}

router.post("/agent", async (req, res) => {
  try {
    const body = (req.body ?? {}) as {
      query?: string;
      question?: string;
      message?: string;
    };
    const query = body.query ?? body.question ?? body.message ?? "";

    const result = await handleAgent(query);
    res.json({
      output: result,
      result,
      answer: result,
      response: result,
    });
  } catch (err) {
    res.status(500).json({
      output: "An internal error occurred while processing the request.",
      error: err instanceof Error ? err.message : String(err),
    });
  }
});

export default router;