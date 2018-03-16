module.exports = {
  profiles: {
    tags: {
      applicationVisibilities: {
        nameTag: "application",
        booleanTags: ["default", "visible"],
        allTags: ["application", "default", "visible"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>.application",
        fileFormat: "xml"
      },
      classAccesses: {
        nameTag: "apexClass",
        booleanTags: ["enabled"],
        allTags: ["apexClass", "enabled"],
        oneFilePerTag: false,
        fileName: "<%= nameTag %>s.classAccesses",
        fileFormat: "xml"
      },
      customPermissions: {
        nameTag: "name",
        booleanTags: ["enabled"],
        allTags: ["enabled", "name"],
        oneFilePerTag: false,
        fileName: "<%= nameTag %>s.customPermissions",
        fileFormat: "xml"
      },
      fieldPermissions: {
        nameTag: "field",
        booleanTags: ["editable", "readable"],
        allTags: ["editable", "field", "readable"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>.fieldPermissions",
        fileFormat: "xml"
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
        fileName: "<%= nameTag %>.objectPermissions",
        fileFormat: "xml"
      },
      pageAccesses: {
        nameTag: "apexPage",
        booleanTags: ["enabled"],
        allTags: ["apexPage", "enabled"],
        oneFilePerTag: false,
        fileName: "<%= nameTag %>s.pageAccesses",
        fileFormat: "xml"
      },
      recordTypeVisibilities: {
        nameTag: "recordType",
        booleanTags: ["default", "visible"],
        allTags: ["default", "recordType", "visible"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>.recordTypeVisibilities",
        fileFormat: "xml"
      },
      tabVisibilities: {
        nameTag: "tab",
        booleanTags: ["visibility", "visible"],
        allTags: ["tab", "visibility"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>.recordTypeVisibilities",
        fileFormat: "xml"
      },
      userPermissions: {
        nameTag: "name",
        booleanTags: ["enabled"],
        allTags: ["enabled", "name"],
        oneFilePerTag: false,
        fileName: "userPermissions",
        fileFormat: "xml"
      },
      layoutAssignments: {
        nameTag: null,
        booleanTags: [],
        allTags: ["layout"],
        oneFilePerTag: false,
        fileName: "layoutAssignments",
        fileFormat: "xml"
      },
      loginIpRanges: {
        nameTag: null,
        booleanTags: [],
        allTags: ["endAddress", "startAddress"],
        oneFilePerTag: false,
        fileName: "loginIpRanges",
        fileFormat: "xml"
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
        fileName: "<%= nameTag %>.label",
        fileFormat: "xml"
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
        fileName: "<%= nameTag %>.application",
        fileFormat: "xml"
      },
      classAccesses: {
        nameTag: "apexClass",
        booleanTags: ["enabled"],
        allTags: ["apexClass", "enabled"],
        oneFilePerTag: false,
        fileName: "<%= nameTag %>s.classAccesses",
        fileFormat: "xml"
      },
      fieldPermissions: {
        nameTag: "field",
        booleanTags: ["editable", "readable"],
        allTags: ["editable", "field", "readable"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>.fieldPermissions",
        fileFormat: "xml"
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
        fileName: "<%= nameTag %>.objectPermissions",
        fileFormat: "xml"
      },
      pageAccesses: {
        nameTag: "apexPage",
        booleanTags: ["enabled"],
        allTags: ["apexPage", "enabled"],
        oneFilePerTag: false,
        fileName: "<%= nameTag %>s.pageAccesses",
        fileFormat: "xml"
      },
      recordTypeVisibilities: {
        nameTag: "recordType",
        booleanTags: ["visible"],
        allTags: ["recordType", "visible"],
        oneFilePerTag: true,
        fileName: "<%= nameTag %>.recordTypeVisibilities",
        fileFormat: "xml"
      },
      userPermissions: {
        nameTag: "name",
        booleanTags: ["enabled"],
        allTags: ["enabled", "name"],
        oneFilePerTag: false,
        fileName: "userPermissions",
        fileFormat: "xml"
      },
      tabSettings: {
        nameTag: "tab",
        booleanTags: ["visibility"],
        allTags: ["tab", "visibility"],
        oneFilePerTag: false,
        fileName: "tabSettings",
        fileFormat: "xml"
      }
    },
    metaTags: ["hasActivationRequired", "label", "license"],
    files: "permissionsets/*.permissionset"
  }
};
