import Category from "../Models/Collection-Model.js";

export const addCollection = async (req, res) => {
  try {
    const { title, description, image } = req.body;
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

//get all collection
export const getAllCollections = async (req, res) => {
  try {
    const collections = await Category.find();
    res.status(200).json({
      success: true,
      collections,
    });
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
