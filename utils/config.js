module.exports = {
  profiles: {
    tags: {
      applicationVisibilities: {
        nameTag: "application",
        booleanTags: ["default", "visible"],
        allTags: ["application", "default", "visible"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      classAccesses: {
        nameTag: "apexClass",
        booleanTags: ["enabled"],
        allTags: ["apexClass", "enabled"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      customPermissions: {
        nameTag: "name",
        booleanTags: ["enabled"],
        allTags: ["enabled", "name"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      fieldPermissions: {
        nameTag: "field",
        booleanTags: ["editable", "readable"],
        allTags: ["editable", "field", "readable"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      objectPermissions: {
        nameTag: "object",
        booleanTags: [
          "allowCreate",
          "allowDelete",
          "allowEdit",
          "allowRead",
          "modifyAllRecords",
          "viewAllRecords"
        ],
        allTags: [
          "allowCreate",
          "allowDelete",
          "allowEdit",
          "allowRead",
          "modifyAllRecords",
          "object",
          "viewAllRecords"
        ],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      pageAccesses: {
        nameTag: "apexPage",
        booleanTags: ["enabled"],
        allTags: ["apexPage", "enabled"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      recordTypeVisibilities: {
        nameTag: "recordType",
        booleanTags: ["default", "visible"],
        allTags: ["default", "recordType", "visible"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      tabVisibilities: {
        nameTag: "tab",
        booleanTags: ["visibility", "visible"],
        allTags: ["tab", "visibility"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      userPermissions: {
        nameTag: "name",
        booleanTags: ["enabled"],
        allTags: ["enabled", "name"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      layoutAssignments: {
        nameTag: "layout",
        booleanTags: [],
        allTags: ["layout", "recordType"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      }
    },
    metaTags: ["custom", "userLicense"],
    files: "profiles/*.profile",
    toIgnoreFiles: [
      "profiles/System Administrator with Deferred Sharing.profile",
      "profiles/PILOT - SE - Fielo Admin.profile",
      "profiles/SE - Case Archive.profile",
      "profiles/SE - Performance User.profile",
      "profiles/Connect Basic Users.profile",
      "profiles/DMT - User with Budget visibility.profile",
      "profiles/SE - Interface - PRM Program Management Connector.profile",
      "profiles/ContractManager.profile",
      "profiles/MarketingProfile.profile",
      "profiles/ReadOnly.profile",
      "profiles/SE - Rewards External Agent.profile",
      "profiles/SolutionManager.profile",
      "profiles/Standard.profile",
      "profiles/StandardAul.profile",
      "profiles/Premier Support User.profile",
      "profiles/Force%2Ecom - App Subscription User.profile",
      "profiles/Company Communities User.profile",
      "profiles/Customer Community Plus User.profile",
      "profiles/Gold Partner User.profile",
      "profiles/Chatter External User.profile",
      "profiles/Fielo Member Site.profile",
      "profiles/Chatter Free User.profile",
      "profiles/Chatter Moderator User.profile",
      "profiles/Customer Portal Manager Custom.profile",
      "profiles/High Volume Customer Portal User.profile",
      "profiles/Authenticated Website.profile",
      "profiles/Fielo Profile.profile",
      "profiles/Customer Community Login User.profile",
      "profiles/Customer Community User.profile",
      "profiles/Identity Profile1466911959685.profile",
      "profiles/Partner Community Login User.profile",
      "profiles/Partner Community User %28Identity%29.profile",
      "profiles/Partner Community User.profile",
      "profiles/Cassini Profile1466910799067.profile",
      "profiles/Compass Community Profile.profile",
      "profiles/Compass Profile.profile",
      "profiles/ELLA Profile.profile",
      "profiles/Guest License User.profile",
      "profiles/Lesser Panda Community Profile.profile",
      "profiles/LoyaltyRedirect Profile.profile",
      "profiles/SE - DMT Advanced User %28Force%2Ecom%29.profile",
      "profiles/SE - DMT Standard User %28Force%2Ecom%29.profile",
      "profiles/Salesforce Identity Login Widget Profile.profile",
      "profiles/demo Profile.profile"
    ],
    rootTag: 'Profile'
  },
  labels: {
    tags: {
      labels: {
        nameTag: "fullName",
        booleanTags: [],
        allTags: [
          "fullName",
          "categories",
          "language",
          "protected",
          "shortDescription",
          "value"
        ],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      }
    },
    metaTags: [],
    files: "labels/CustomLabels.labels",
    rootTag:"CustomLabels"
  },
  permissionsets: {
    tags: {
      applicationVisibilities: {
        nameTag: "application",
        booleanTags: ["visible"],
        allTags: ["application", "visible"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      classAccesses: {
        nameTag: "apexClass",
        booleanTags: ["enabled"],
        allTags: ["apexClass", "enabled"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      fieldPermissions: {
        nameTag: "field",
        booleanTags: ["editable", "readable"],
        allTags: ["editable", "field", "readable"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      objectPermissions: {
        nameTag: "object",
        booleanTags: [
          "allowCreate",
          "allowDelete",
          "allowEdit",
          "allowRead",
          "modifyAllRecords",
          "viewAllRecords"
        ],
        allTags: [
          "allowCreate",
          "allowDelete",
          "allowEdit",
          "allowRead",
          "modifyAllRecords",
          "object",
          "viewAllRecords"
        ],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      pageAccesses: {
        nameTag: "apexPage",
        booleanTags: ["enabled"],
        allTags: ["apexPage", "enabled"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      recordTypeVisibilities: {
        nameTag: "recordType",
        booleanTags: ["visible"],
        allTags: ["recordType", "visible"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      userPermissions: {
        nameTag: "name",
        booleanTags: ["enabled"],
        allTags: ["enabled", "name"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      tabSettings: {
        nameTag: "tab",
        booleanTags: ["visibility"],
        allTags: ["tab", "visibility"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      }
    },
    metaTags: ["hasActivationRequired", "label", "license"],
    files: "permissionsets/*.permissionset",
    rootTag: "PermissionSet"
  }
};
