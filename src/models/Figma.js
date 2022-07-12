// const puppeteer = require("puppeteer");
// const fs = require("fs/promises");
// const { email, username, password } = require("./credentials");

// class Figma_Integration {
//   constructor() {
//     this.url = "https://www.figma.com/login";
//     this.file = "./members.json";
//   }
//   getTime() {
//     // Retreives the current system Time

//     var today = new Date();
//     var time =
//       today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     return time;
//   }

//   async click(selector) {
//     // Waits for the DOM element to render and clicks on it
//     let status, message;
//     await this.page.waitForSelector(selector).catch((err) => {
//       status = 102;
//       message = err.message;
//     });
//     if (status == 102) {
//       return { status, message, selector: selector };
//     }
//     this.page.click(selector);
//     return { status: 200, message: "successful" };
//   }

//   async type(selector, value) {
//     // Waits for the DOM element to render and types in it
//     let status, message;
//     await this.page.waitForSelector(selector).catch((err) => {
//       status = 102;
//       message = err.message;
//     });
//     if (status == 102) {
//       return { status, message, selector: selector };
//     }

//     await this.page.type(selector, value, { delay: 100 });
//     return { status: 200, message: "successful" };
//   }

//   async writeIntoFile(file, value) {
//     // Writes data into a file. The file name is to be provided as the first parameter and the data as the second parameter

//     await fs.writeFile(file, JSON.stringify(value), (err) =>
//       err ? console.log(err) : null
//     );
//   }

//   async readFile(file) {
//     await fs.readFile("./members.json", "utf8", (err, data) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       console.log(data);
//       return JSON.parse(data);
//     });
//   }
//   async close() {
//     await this.browser.close();
//   }
//   async launch() {
//     // Launches a new chromium browser and navigates to Figma's website
//     let status, message;
//     console.log("[+] Launching Figma <" + this.getTime() + "> ");
//     //this.browser = await puppeteer.launch();
//     this.browser = await puppeteer.launch({
//       headless: false,
//       defaultViewport: false,
//     });
//     this.page = await this.browser.newPage();

//     await this.page.setUserAgent(
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
//     );
//     try {
//       status = await (await this.page.goto(this.url)).status();

//       if (status == 404) {
//         message = "URL not found: " + this.url;
//         this.close();
//         console.log(
//           "[-] " + status + " : " + message + " <" + this.getTime() + ">"
//         );
//         return { status, message };
//       } else if (status == 500) {
//         message = "Internal server error";
//         this.close();
//         console.log(
//           "[-] " + status + " : " + message + " <" + this.getTime() + ">"
//         );
//         return { status, message };
//       }
//     } catch (err) {
//       message = err;
//       status = 101;
//       this.close();
//       console.log(
//         "[-] " + status + " : " + message + " <" + this.getTime() + ">"
//       );
//       return { status, message };
//     }

//     message = "Successfully Launched Figma";
//     console.log("[+] Successfully Launched Figma <" + this.getTime() + "> ");
//     return { status, message };
//   }

//   async login() {
//     // Logs in the IT admin
//     let status, message;
//     console.log("[+] Login Initiated <" + this.getTime() + "> ");

//     let ret = await this.type("#email", email);
//     if (ret.status == 102) {
//       console.log("[-] " + ret.status + " : " + ret.message);
//       return ret;
//     }

//     ret = await this.type("#current-password", password);
//     if (ret.status == 102) {
//       console.log("[-] " + ret.status + " : " + ret.message);
//       return ret;
//     }

//     ret = await this.click('[type="submit"]');
//     if (ret.status == 102) {
//       console.log("[-] " + ret.status + " : " + ret.message);
//       return ret;
//     }

//     console.log("[+] Successfully Logged In <" + this.getTime() + "> ");
//     return { status: 200, message: "Login successful" };
//   }

//   async logout() {
//     //Logs out the IT admin

//     console.log("[+] Logging out <" + this.getTime() + "> ");
//     await this.click(
//       ".action--enabled--16Cku.action--root--1ClVW.toolbar_styles--enabledButton--2cWGq.navbar--profileAction--3Jn4_.navbar--navbarAction--3J65x.chevron--chevronContainer--3xT09"
//     );
//     await this.click(
//       ".scroll_container--innerScrollContainer--21gfN > div > div:nth-child(9)"
//     );
//   }

//   async getMembers() {
//     //Retrieves members of the team from the Figma database

//     console.log("[+] Getting Members <" + this.getTime() + "> ");

//     await this.click(".team_link--teamDetails--2DmNG");

//     await this.click(
//       ".tab--base--vEslZ.text--fontPos13--1DoEt.text--_fontBase--YWDo0.desktop_tool_bar--toolBarTabContentBase--3IywG.tab--unselected--2T1WZ"
//     );
//     await this.page.waitForNavigation();

//     const selector =
//       ".entity--adminTableRow--19-a8.table--row--F9DxE.multi_select_list--row--2qfx9";
//     const members = await this.page.$$eval(selector, (nodes) => {
//       return nodes.map((node) => {
//         const memberNameWrapper = node.querySelector(".avatar--handle--fICEU");
//         const memberName = memberNameWrapper.textContent;
//         const memberEmailWrapper = node.querySelector(".avatar--email--F5k8l");
//         const memberEmail = memberEmailWrapper
//           ? memberEmailWrapper.textContent
//           : null;
//         const memberActivityWrapper = node.querySelector(
//           ".basic_form--link--11HI0.blue_link--blueLink--22X56.members_table--link--32iw6.admin_settings_page--link--3mBrq.blue_link--blueLink--22X56 span"
//         );
//         const memberActivity = memberActivityWrapper
//           ? memberActivityWrapper.textContent
//           : null;
//         const memberPermissionWrapper = node.querySelector(
//           ".members_table--permissionsColumn--1Ci5H.members_table--column--1A2oa.admin_settings_page--membersColumn--1qdGV.table--column--CuH34 span"
//         );
//         const memberPermission = memberPermissionWrapper.textContent;
//         return { memberName, memberEmail, memberActivity, memberPermission };
//       });
//     });
//     //console.log(members);
//     this.writeIntoFile(this.file, members);

//     console.log("[+] Members retreived <" + this.getTime() + "> ");
//     return members;
//   }

//   async inviteMember(add_email) {
//     console.log(
//       "[+] Inviting Member " + add_email + " <" + this.getTime() + "> "
//     );

//     await this.click(".team_link--teamDetails--2DmNG");

//     await this.click(
//       ".tab--base--vEslZ.text--fontPos13--1DoEt.text--_fontBase--YWDo0.desktop_tool_bar--toolBarTabContentBase--3IywG.tab--unselected--2T1WZ"
//     );
//     await this.page.waitForNavigation();

//     await this.click(
//       ".desktop_tool_bar--toolBarButton--PIG7r.text--fontPos11--RSei3.text--_fontBase--YWDo0"
//     );

//     await this.type(
//       ".autocomplete_input--input--GaHQC.autocomplete_input--tokenPadding--1odgI.lazy_input--lazyInput--2kTZE",
//       add_email
//     );

//     await this.click(
//       ".basic_form--primaryBtn--3NqnQ.basic_form--btn--3A-Ju.ellipsis--ellipsis--1RWY6.text--fontPos11--RSei3.text--_fontBase--YWDo0.token_form--buttonFtrV2--12MbQ"
//     );

//     await this.click(".close_button--closeX--2ttg_");

//     console.log("[+] Invite sent <" + this.getTime() + "> ");
//   }

//   async deleteMember() {
//     console.log("[+] Deleting Member <" + this.getTime() + "> ");

//     await this.click(".team_link--teamDetails--2DmNG");

//     await this.click(
//       ".tab--base--vEslZ.text--fontPos13--1DoEt.text--_fontBase--YWDo0.desktop_tool_bar--toolBarTabContentBase--3IywG.tab--unselected--2T1WZ"
//     );
//     await this.page.waitForNavigation();

//     let selector =
//       ".entity--adminTableRow--19-a8.table--row--F9DxE.multi_select_list--row--2qfx9";

//     let deleteEmail = "abhijith.s+13@taskel.it";
//     await this.page.$$eval(
//       selector,
//       (nodes, deleteEmail) => {
//         return nodes.map((node) => {
//           const memberEmailWrapper = node.querySelector(
//             ".avatar--email--F5k8l"
//           );
//           const memberCheckboxWrapper = node.querySelector(
//             ".mixed_checkbox--checkboxInput--3rBcT"
//           );
//           const memberEmail = memberEmailWrapper
//             ? memberEmailWrapper.textContent
//             : null;
//           if (deleteEmail == memberEmail) {
//             memberCheckboxWrapper.click();
//             return "Found";
//           } else {
//             return "Not Found";
//           }
//         });
//       },
//       deleteEmail
//     );

//     await this.click(
//       ".multi_select_list--actionBarContentContainerVisible--2V0-T.multi_select_list--actionBarContentContainer--1wprE._overlayBase--_overlayBase--1sCqN.text--fontNeg11--1EuEG.text--_fontBase--YWDo0.text--_negText--5S_2N div:nth-child(4)"
//     );
//     await this.click(
//       ".header_modal--confirmButtonBox--33Lz- button:nth-child(2)"
//     );
//     //*[@id="react-page"]/div/div/div[3]/div/div/div/div[2]/div[2]/button[2]

//     console.log("[+] Member Deleted <" + this.getTime() + "> ");
//   }

//   async deleteAccount() {
//     // Deletes the account

//     console.log("[+] Deleting Account <" + this.getTime() + "> ");
//     await this.click(
//       ".action--enabled--16Cku.action--root--1ClVW.toolbar_styles--enabledButton--2cWGq.navbar--profileAction--3Jn4_.navbar--navbarAction--3J65x.chevron--chevronContainer--3xT09"
//     );
//     await this.click(
//       ".scroll_container--innerScrollContainer--21gfN > div > div:nth-child(5)"
//     );
//     await this.click(
//       ".account_settings_modal--redLink--pdBm6.account_settings_modal--blueLink--3YdiL.blue_link--blueLink--22X56"
//     );

//     await this.type(".modal--textInput--q3dSz", password);
//     await this.click('[type="submit"]');

//     await this.page.waitForTimeout(2000);

//     await this.type(
//       ".modal--textInput--q3dSz.lazy_input--lazyInput--2kTZE",
//       "delete my account"
//     );
//     //await this.click('[type="submit"]');

//     console.log("[+] Account deleted successfully <" + this.getTime() + "> ");
//   }
//   async print() {
//     console.log("Print Function");
//   }
// }

// module.exports = Figma_Integration;
