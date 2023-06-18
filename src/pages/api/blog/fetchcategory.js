// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDb from "../../../../middleware/connectToDb";
import Article from "../../../../Models/Article";

connectToDb();
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, msg: 'Method not allowed' });
    }
  
    const { category } = req.body;
    const regexCategory = new RegExp(`\\b${category}\\b`, 'i');
  
    const articles = await Article.find({ category: { $regex: regexCategory } });
  
    if (!articles || articles.length === 0) {
      return res.status(404).json({ success: false, msg: 'Article not found' });
    }
  
    return res.status(200).json({ success: true, msg: 'Article found', articles: articles });
  }
  
  
  
