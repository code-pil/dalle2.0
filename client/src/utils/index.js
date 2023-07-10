import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constants/";
import { redirect } from "react-router-dom";

export const getRandomPrompt = (prompt) => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomIndex === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
};

export const downloadImage = async (_id, photo) => {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
};

export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();

  const duration = expirationDate.getTime() - now.getTime();

  return duration;
};
  
export const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const duration = getTokenDuration();

  if(duration < 0){
    return 'EXPIRED'
  }

  return token;
};

export const tokenLoader = () => {
  return getToken();
};

export const checkAuthLoader = () => {
  const token = getToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
};
