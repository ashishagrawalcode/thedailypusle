const pool = require('../config/db'); // The bridge to PostgreSQL

// 1. GET: Fetch all notices for the Public Front Page
exports.getAllNotices = async (req, res) => {
    try {
        // Fetch all notices, newest first
        const result = await pool.query('SELECT * FROM notices ORDER BY created_at DESC');

        // We map the database columns (snake_case) to the frontend expected keys (camelCase)
        const formattedNotices = result.rows.map(notice => ({
            id: notice.id,
            title: notice.title,
            excerpt: notice.excerpt,
            content: notice.content,
            imageUrl: notice.image_url,
            category: notice.category,
            views: notice.views,
            status: notice.status,
            authorId: notice.author_id,
            date: notice.created_at
        }));

        res.status(200).json(formattedNotices);
    } catch (error) {
        console.error("Database fetch error:", error);
        res.status(500).json({ error: "Failed to fetch news from the vault." });
    }
};

// 2. POST: Insert a new notice into the Database
exports.createNotice = async (req, res) => {
    try {
        const { title, content, excerpt, category, imageUrl } = req.body;

        // Insert into PostgreSQL
        const newNotice = await pool.query(
            `INSERT INTO notices (title, content, excerpt, category, image_url, author_id) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [
                title || "Untitled",
                content || "",
                excerpt || "A new dispatch...",
                category || "Top Stories",
                imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800",
                req.user.userId // Pulled from the JWT middleware!
            ]
        );

        res.status(201).json({ message: "Notice published!", notice: newNotice.rows[0] });
    } catch (error) {
        console.error("Database insert error:", error);
        res.status(500).json({ error: "Failed to publish notice." });
    }
};

// 3. DELETE: Remove a notice from the Database
exports.deleteNotice = async (req, res) => {
    try {
        const noticeId = Number(req.params.id);
        await pool.query('DELETE FROM notices WHERE id = $1', [noticeId]);
        res.status(200).json({ message: `Notice ${noticeId} permanently deleted.` });
    } catch (error) {
        console.error("Database delete error:", error);
        res.status(500).json({ error: "Failed to delete notice." });
    }
};