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
        allTags: ["layout"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>"
      },
      loginIpRanges: {
        nameTag: null,
        booleanTags: [],
        allTags: ["endAddress", "startAddress"],
        oneFilePerTag: true,
        fileName: "loginIpRanges"
      }
    },
    metaTags: ["custom", "userLicense"],
    files: "profiles/*.profile"
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
    files: "labels/CustomLabels.labels"
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
        fileName: "tabSettings"
      }
    },
    metaTags: ["hasActivationRequired", "label", "license"],
    files: "permissionsets/*.permissionset"
  }
};
