import multer from "multer";

const storage = multer.diskStorage({
  destination: "./uploads/recipients/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.patch(
  "/recipients/:id/avatar",
  authMiddleware,
  upload.single("avatar"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const filePath = "/uploads/recipients/" + req.file.filename;

      const updated = await Recipient.findByIdAndUpdate(
        req.params.id,
        { avatar: filePath },
        { new: true }
      );

      res.json({ avatar: updated.avatar });
    } catch (e) {
      res.status(500).json({ error: "Avatar upload failed" });
    }
  }
);
