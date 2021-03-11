const mongo = require("./mongo");
const Schema = require("../schemas/mafia");

class AmountError extends Error {
  constructor(message) {
    super(message);
    this.name = "AmountError";
  }
}

module.exports.AmountError = AmountError;

class ProfileError extends Error {
  constructor(message) {
    super(message);
    this.name = "ProfileError";
  }
}
module.exports.ProfileError = ProfileError;

module.exports.Economy = class Economy {
  /**
   *
   * @param {string} userID The ID of the User to add coins
   * @param {number} amount the amount of coins to add to the user
   * @returns {boolean} the boolean checking if it was successful.
   */
  async addCoins(userID, amount) {
    let profile = await Schema.findOne({ ownerID: userID });
    if (!profile)
      throw new ProfileError("The Target User Does Not Have a Profile.");
    try {
      await Schema.findOneAndUpdate(
        {
          ownerID: userID,
        },
        {
          $inc: {
            money: amount,
          },
        },
        {
          upsert: true,
        }
      );
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  /**
   *
   * @param {string} userID The ID of the User to withdraw.
   * @param {number} amount the amount of coins to add to the user
   * @returns {boolean} the boolean checking if it was successful.
   */

  async withdraw(userID, amount) {
    let profile = await Schema.findOne({ ownerID: userID });
    if (!profile)
      throw new ProfileError("The Target User Does Not Have a Profile.");
    amount = parseInt(amount.replace("all", profile.secured));
    if (profile.secured < amount)
      throw new AmountError(
        "The Amount to Withdraw is Bigger than the User's Secured."
      );

    try {
      await Schema.findOneAndUpdate(
        {
          ownerID: userID,
        },
        {
          $inc: {
            money: +amount,
            secured: -amount,
          },
        },
        {
          upsert: true,
        }
      );
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async secure(userID, amount) {
    let profile = await Schema.findOne({ ownerID: userID });
    if (!profile)
      throw new ProfileError("The Target User Does Not Have a Profile.");
    amount = parseInt(amount.replace("all", profile.money));
    if (profile.money < amount)
      throw new AmountError(
        "The Amount to Secure is Bigger than the User's Money."
      );

    try {
      await Schema.findOneAndUpdate(
        {
          ownerID: userID,
        },
        {
          $inc: {
            money: -amount,
            secured: +-amount,
          },
        },
        {
          upsert: true,
        }
      );
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async viewBalance(userID) {
    let profile = await Schema.findOne({ ownerID: userID });
    if (!profile)
      throw new ProfileError("The Target User Does Not Have a Profile.");

    const obj = {
      money: profile.money,
      secured: profile.secured,
    };

    return obj;
  }
};
