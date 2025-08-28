require("dotenv").config();
const axios = require("axios");

// Buy Airtime
const buyAirtime = async (req, res) => {
  try {
    const { serviceID, amount, phone, request_id } = req.body;

    const response = await axios.post(
      `${process.env.VTPASS_BASE_URL}/pay`,
      {
        serviceID,
        amount,
        phone,
        request_id,
      },
      {
        headers: {
          "api-key": process.env.VTPASS_API_KEY,
          "secret-key": process.env.VTPASS_SECRET_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buy Data
const getData = async (req, res) => {
  const { serviceID } = req.query;
  try {
    const response = await axios.get(
      `${process.env.VTPASS_BASE_URL}/service-variations?serviceID=${serviceID}`,
      {
        headers: {
          "api-key": process.env.VTPASS_API_KEY,
          "public-key": process.env.VTPASS_PULIC_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const buyData = async (req, res) => {
  try {
    const {
      request_id,
      serviceID,
      billersCode,
      variation_code,
      amount,
      phone,
    } = req.body;

    const response = await axios.post(
      `${process.env.VTPASS_BASE_URL}/pay`,
      {
        request_id,
        serviceID,
        billersCode,
        variation_code,
        amount,
        phone,
      },
      {
        headers: {
          "api-key": process.env.VTPASS_API_KEY,
          "secret-key": process.env.VTPASS_SECRET_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//

const verifySmartCard = async (req, res) => {
  try {
    const { billersCode, serviceID } = req.body;

    const response = await axios.post(
      `${process.env.VTPASS_BASE_URL}/merchant-verify`,
      {
        billersCode,
        serviceID,
      },
      {
        headers: {
          "api-key": process.env.VTPASS_API_KEY,
          "secret-key": process.env.VTPASS_SECRET_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buy Cable
const buyCable = async (req, res) => {
  try {
    const {
      request_id,
      serviceID,
      billersCode,
      variation_code,
      amount,
      phone,
      subscription_type,
      quantity,
    } = req.body;

    const response = await axios.post(
      `${process.env.VTPASS_BASE_URL}/pay`,
      {
        request_id,
        serviceID,
        billersCode,
        variation_code,
        amount,
        phone,
        subscription_type,
        quantity,
      },
      {
        headers: {
          "api-key": process.env.VTPASS_API_KEY,
          "secret-key": process.env.VTPASS_SECRET_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Electricity
const verifyMeterNo = async (req, res) => {
  try {
    const { billersCode, serviceID, type } = req.body;

    const response = await axios.post(
      `${process.env.VTPASS_BASE_URL}/merchant-verify`,
      {
        billersCode,
        serviceID,
        type,
      },
      {
        headers: {
          "api-key": process.env.VTPASS_API_KEY,
          "secret-key": process.env.VTPASS_SECRET_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const buyElectricity = async (req, res) => {
  try {
    const {
      request_id,
      serviceID,
      billersCode,
      variation_code,
      amount,
      phone,
    } = req.body;

    const response = await axios.post(
      `${process.env.VTPASS_BASE_URL}/pay`,
      {
        request_id,
        serviceID,
        billersCode,
        variation_code,
        amount,
        phone,
      },
      {
        headers: {
          "api-key": process.env.VTPASS_API_KEY,
          "secret-key": process.env.VTPASS_SECRET_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const payBill = async (req, res) => {
  try {
    const { serviceID, amount, phone, request_id } = req.body;

    const response = await axios.post(
      `${process.env.VTPASS_BASE_URL}/pay`,
      {
        serviceID,
        amount,
        phone,
        request_id,
      },
      {
        headers: {
          "api-key": process.env.VTPASS_API_KEY,
          "secret-key": process.env.VTPASS_SECRET_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Query bill
const queryBill = async (req, res) => {
  try {
    const { request_id } = req.body;

    const response = await axios.post(
      `${process.env.VTPASS_BASE_URL}/requery`,
      {
        request_id,
      },
      {
        headers: {
          "api-key": process.env.VTPASS_API_KEY,
          "secret-key": process.env.VTPASS_SECRET_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBillCategory = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.VTPASS_BASE_URL}/service-categories`,
      {
        headers: {
          "api-key": process.env.VTPASS_API_KEY,
          "public-key": process.env.VTPASS_PULIC_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getData,
  buyData,
  verifySmartCard,
  buyCable,
  verifyMeterNo,
  buyElectricity,
  payBill,
  getBillCategory,
  queryBill,
};
