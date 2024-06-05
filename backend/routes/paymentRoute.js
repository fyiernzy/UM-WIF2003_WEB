import express from "express";
import {
  SelectedWallet,
  SelectedBank,
  CreditOrDebitCard,
} from "../models/payment.js";
import { Project } from "../models/projectModel.js";

const router = express.Router();

// E Wallet
router.post("/submit", async (req, res) => {
  try {
    const { selectedWallet , userId } = req.body;

    if (!selectedWallet || !userId) {
      return res.status(400).send("Both e wallet and user information are required");
    }

    const newSelectedWallet = new SelectedWallet({ selectedWallet, userId });
    await newSelectedWallet.save();

    res.status(200).send("Data saved successfully.");
  } catch (error) {
    console.error("Error saving selected e wallet:", error);
    res.status(500).send("Internal server error.");
  }
});

router.get("/selectedWallets", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).send("User ID is required");
    }

    const selectedWallets = await SelectedWallet.find({ userId });
    const selectedWalletNames = selectedWallets.map(selectedWallet => selectedWallet.selectedWallet);
    res.status(200).json(selectedWalletNames);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

// Bank
router.post("/submitBank", async (req, res) => {
  try {
    const { selectedBank , userId } = req.body;

    if (!selectedBank || !userId) { // Check if both selectedBank and userId are provided
      return res.status(400).send("Both bank and user information are required");
    }

    const newSelectedBank = new SelectedBank({ selectedBank, userId }); // Associate userId with selectedBank
    await newSelectedBank.save();

    res.status(200).send("Data saved successfully.");
  } catch (error) {
    console.error("Error saving selected bank:", error);
    res.status(500).send("Internal server error.");
  }
});

router.get("/selectedBanks", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).send("User ID is required");
    }

    const selectedBanks = await SelectedBank.find({ userId });
    const selectedBankNames = selectedBanks.map(selectedBank => selectedBank.selectedBank);
    res.status(200).json(selectedBankNames);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});


// Card
router.post("/submitCard", async (req, res) => {
  try {
    const cardData = req.body;
    const newCard = new CreditOrDebitCard(cardData);
    await newCard.save();
    res.status(200).send("Data saved successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});


router.get("/getCardNumbers", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).send("User ID is required");
    }

    const cards = await CreditOrDebitCard.find({ userId }, "cardNumber -_id");
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});
  
// Task
router.get("/task", async (req, res) => {
  try {
    const project = await Project.findOne({});

    if (!project) {
      return res.status(404).send("Project not found");
    }

    const { projectTitle, projectBudget } = project;

    res.status(200).json({ projectTitle, projectBudget });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

// Invoice List
  router.get('/invoices/:postedBy', async (req, res) => {
    try {
      const { postedBy } = req.params;
      if (!postedBy) {
        return res.status(400).json({ message: "User ID is required." });
      }

      let projects = await Project.find({ postedBy : postedBy , completed : true }, 'projectTitle projectBudget');
      res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  });

  // Invoice 
  router.get('/invoiceContent/:postedBy', async (req, res) => {
    try {
      const { postedBy } = req.params;
      if (!postedBy) {
        return res.status(400).json({ message: "User ID is required." });
      }

      let projects = await Project.find({ postedBy : postedBy }, 'projectTitle projectBudget projectDescription location projectCategory projectDuration contactInformation deadline additionalNotes');
      res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  });



export default router;
