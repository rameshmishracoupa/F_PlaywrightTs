export const DropTableLocators = {
    connectionOpen: "//div[@data-testid='DropActionProperties_ConnectionDropdown']//div[1]/div[1]",
    connectionSelect: "[data-testid='DropActionProperties_ConnectionDropdown_Menu'] [title='${connectionName}'] > span",
    configureButton: "[data-testid='DropActionProperties_ConfigureButton']",
    saveConfig: "[data-testid='ConfigureDropTablesModal_SaveButton']",
    tablebyname: "[data-testid^='dbo.'][title='${tableName}']",
    tableToDropBox: "//div[@data-testid='TableList_Container'][.//div[@class='TableList__title__jA8AR' and text()='Tables To Drop']]//div[@class='TableList__content__HQJUh']"
};