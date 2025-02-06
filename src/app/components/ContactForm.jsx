"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";

const inputFillChecking = {
  titleName: "姓名",
  titleEmail: "電郵地址",
  titleContent: "內容",
  placeholder: "請填寫",
  missionControl: "草根文化館",
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    senderName: "",
    email: "",
    message: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  useEffect(() => {
    const { senderName, email, message } = formData;
    setIsFormValid(senderName.trim() !== "" && email.trim() !== "" && message.trim() !== "");
  }, [formData]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    form.append("access_key", "cb229ca6-07dc-41c8-a2b2-99e9e6e287f5");
    form.append("subject", "Normal Inquiry - " + formData.senderName);

    const object = Object.fromEntries(form);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });

    const result = await response.json();
    if (result.success) {
      setIsSubmitSuccessful(true);
    }
  }

  if (isSubmitSuccessful) {
    return (
      <div style={{ textAlign: "center" }}>
        <CheckCircleIcon sx={{ fontSize: 100 }} color="success" />
        <Typography color={green[900]}>
          <strong>Email Sent</strong>
        </Typography>
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name="senderName"
            id="senderName"
            required
            placeholder={inputFillChecking.placeholder}
            label={inputFillChecking.titleName}
            fullWidth
            variant="standard"
            value={formData.senderName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            id="email"
            required
            label={inputFillChecking.titleEmail}
            fullWidth
            variant="standard"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={inputFillChecking.titleContent}
            fullWidth
            required
            multiline
            maxRows={4}
            name="message"
            variant="standard"
            value={formData.message}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} container justifyContent="center" alignItems="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "60vw", padding: 1, margin: 2 }}
            disabled={!isFormValid}
          >
            {"Send Email"}
          </Button>
        </Grid>
        <Grid item xs={12} container justifyContent="center" alignItems="center">
          <input type="hidden" name="from_name" value={inputFillChecking.missionControl}></input>
        </Grid>
      </Grid>
    </form>
  );
}