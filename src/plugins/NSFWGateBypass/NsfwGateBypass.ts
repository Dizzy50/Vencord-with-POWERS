/**
 * @name NSFWGateBypass
 * @author DLL0415 (converted for Vencord)
 * @description Bypasses NSFW/18+ gates in Discord.
 * @version 1.0.0
 */

import { Plugin } from "vencord"; // adjust import if repo uses a different base class

export default class NSFWGateBypass extends Plugin {
    start() {
        this.patchNSFWCheck();
    }

    stop() {
        // Undo patches if needed
    }

    patchNSFWCheck() {
        const UserStore = BdApi.findModuleByProps("getCurrentUser");

        if (!UserStore || !UserStore.getCurrentUser) return;

        const user = UserStore.getCurrentUser();
        if (user) {
            user.nsfwAllowed = true;
            user.ageVerified = true;
            user.age = 18; // set to 18 to minimize risk
            user.ageGateBypass = true;
        }

        // If Vencord uses patching, you can implement a patch like this:
        // Patcher.after("NSFWGateBypass", UserStore, "getCurrentUser", (_, __, user) => {
        //     if (user) {
        //         user.nsfwAllowed = true;
        //         user.ageVerified = true;
        //         user.age = 18;
        //         user.ageGateBypass = true;
        //     }
        // });
    }
}