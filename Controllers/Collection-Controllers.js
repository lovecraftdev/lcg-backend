import Category from "../Models/Collection-Model.js";

export const addCollection = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    //Check if already exist
    const category = await Category.findOne({ title });
    if (category) {
      return res
        .status(400)
        .json({ success: false, message: "Collection Already Exists" });
    }
    const newCollection = await Category.create({
      title,
      description,
      image,
    });
    res.status(201).json({
      success: true,
      message: "Collection Created Successfully",
      newCollection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCollectionsBySearch = async (req, res) => {
  try {
    const search = req.query.search;

    const collections = await Category.find({
      title: { $regex: new RegExp(search, "i") }, // Case-insensitive search
    });

    res.json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
