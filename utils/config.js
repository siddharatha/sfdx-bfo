module.exports = {
  profiles: {
    tags: {
      applicationVisibilities: {
        nameTag: "application",
        booleanTags: ["default", "visible"],
        allTags: ["application", "default", "visible"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>",
        fileFormat: "json"
      },
      classAccesses: {
        nameTag: "apexClass",
        booleanTags: ["enabled"],
        allTags: ["apexClass", "enabled"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>",
        fileFormat: "json"
      },
      customPermissions: {
        nameTag: "name",
        booleanTags: ["enabled"],
        allTags: ["enabled", "name"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>",
        fileFormat: "json"
      },
      fieldPermissions: {
        nameTag: "field",
        booleanTags: ["editable", "readable"],
        allTags: ["editable", "field", "readable"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>",
        fileFormat: "json"
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
        fileName: "<%= nameTag %>",
        fileFormat: "json"
      },
      pageAccesses: {
        nameTag: "apexPage",
        booleanTags: ["enabled"],
        allTags: ["apexPage", "enabled"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>",
        fileFormat: "json"
      },
      recordTypeVisibilities: {
        nameTag: "recordType",
        booleanTags: ["default", "visible"],
        allTags: ["default", "recordType", "visible"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>",
        fileFormat: "json"
      },
      tabVisibilities: {
        nameTag: "tab",
        booleanTags: ["visibility", "visible"],
        allTags: ["tab", "visibility"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>",
        fileFormat: "json"
      },
      userPermissions: {
        nameTag: "name",
        booleanTags: ["enabled"],
        allTags: ["enabled", "name"],
        oneFilePerTag: true,
        fileName: "userPermissions",
        fileFormat: "json"
      },
      layoutAssignments: {
        nameTag: null,
        booleanTags: [],
        allTags: ["layout"],
        oneFilePerTag: true,
        fileName: "layoutAssignments",
        fileFormat: "json"
      },
      loginIpRanges: {
        nameTag: null,
        booleanTags: [],
        allTags: ["endAddress", "startAddress"],
        oneFilePerTag: true,
        fileName: "loginIpRanges",
        fileFormat: "json"
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
        alltags: [
          "fullName",
          "categories",
          "language",
          "protected",
          "shortDescription",
          "value"
        ],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>",
        fileFormat: "json"
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
        fileName: "<%= nameTag %>",
        fileFormat: "json"
      },
      classAccesses: {
        nameTag: "apexClass",
        booleanTags: ["enabled"],
        allTags: ["apexClass", "enabled"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>",
        fileFormat: "json"
      },
      fieldPermissions: {
        nameTag: "field",
        booleanTags: ["editable", "readable"],
        allTags: ["editable", "field", "readable"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>",
        fileFormat: "json"
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
        fileName: "<%= nameTag %>",
        fileFormat: "json"
      },
      pageAccesses: {
        nameTag: "apexPage",
        booleanTags: ["enabled"],
        allTags: ["apexPage", "enabled"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>",
        fileFormat: "json"
      },
      recordTypeVisibilities: {
        nameTag: "recordType",
        booleanTags: ["visible"],
        allTags: ["recordType", "visible"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>",
        fileFormat: "json"
      },
      userPermissions: {
        nameTag: "name",
        booleanTags: ["enabled"],
        allTags: ["enabled", "name"],
        oneFilePerTag: true,
        fileName: "userPermissions",
        fileFormat: "json"
      },
      tabSettings: {
        nameTag: "tab",
        booleanTags: ["visibility"],
        allTags: ["tab", "visibility"],
        oneFilePerTag: true,
        fileName: "tabSettings",
        fileFormat: "json"
      }
    },
    metaTags: ["hasActivationRequired", "label", "license"],
    files: "permissionsets/*.permissionset"
  }
};
