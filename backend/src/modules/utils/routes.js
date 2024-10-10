import { Router } from "express";

import { LANGUAJES, PROFESSIONS, FRAMEWORKS, LINKSAPPS } from "./valueList.js";
import { handleAuth, users } from "../../middleware/handlePolicies.js";

const router = Router();

// http://localhost:8080/v1/values/

router
.get    ('/languajes',   handleAuth(users), (req, res) => res.sendSuccess(LANGUAJES))
.get    ('/professions', handleAuth(users), (req, res) => res.sendSuccess(PROFESSIONS))
.get    ('/frameworks', handleAuth(users), (req, res) => res.sendSuccess(FRAMEWORKS))
.get    ('/applinks', handleAuth(users), (req, res) => res.sendSuccess(LINKSAPPS))

export default router