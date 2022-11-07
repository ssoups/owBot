import randomCharacter from "../util/team-splits/randomCharacter.js";
import randomRole from "../util/team-splits/randomrole.js";
import regularsplit from "../util/team-splits/regularSplit.js"

export default function teamSplit(message, action){
    if (action == "rr" || "randomrole") randomRole(message)
    else if(action == "rc" || "randomcharacter") randomCharacter(message)
    else regularsplit(message)
}