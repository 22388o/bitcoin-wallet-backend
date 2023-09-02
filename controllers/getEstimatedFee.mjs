"use strict";
import mempoolJS from "@mempool/mempool.js";

export const getestimatedfee = async (req, res) => {
  const {
    bitcoin: { fees },
  } = mempoolJS({ hostname: "mempool.space" });
  const feesRecommended = await fees.getFeesRecommended();

  res.send(feesRecommended);
};
