
function getDiagramFileName(dialogName) {
    if (dialogName === 'export')
        return document.getElementById('diagramName').innerHTML.toString();
    if (dialogName === 'save')
        return document.getElementById('saveFileName').value.toString();
    else
        return document.getElementById('diagramName').innerHTML.toString();
}
function importDescription(formatName) {
    if (formatName === 'CSV') {
        document.getElementById('descriptionText1').innerHTML = "Make sure that each column of the table has a header";
        document.getElementById('descriptionText2').innerHTML = "Each employee should have a reporting person (except the top most employee of the organization), and it should be indicated by any field from the data source.";

    }
    else if (formatName == 'XML') {
        document.getElementById('descriptionText1').innerHTML = "Make sure that XML document has a unique root element and start-tags have matching end-tags.";
        document.getElementById('descriptionText2').innerHTML = "All XML elements will be considered employees and will act as a reporting person for its child XML elements.";

    }
    else {
        document.getElementById('descriptionText1').innerHTML = "Make sure that you have defined a valid JSON format.";
        document.getElementById('descriptionText2').innerHTML = "Each employee should have a reporting person (except the top most employee of the organization), and it should be indicated by any field from the data source.";
    }

}
importData = function (object) {
    var orgDataSource = []; var columnsList = []
    orgDataSource = JSON.parse(object);
    var dada = orgDataSource[0];
    for (var prop in dada) { columnsList.push(prop) }
    return columnsList
};

function saveDiagram(data, filename) {
    if (window.navigator.msSaveBlob) {
        let blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
        window.navigator.msSaveOrOpenBlob(blob, filename + '.json');
    } else {
        let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
        let a = document.createElement('a');
        a.href = dataStr;
        a.download = filename + '.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
}
function loadFile(file) {
    var base64 = file.rawFile.replace("data:application/json;base64,", "");
    var json = atob(base64)
    return json;
}

function downloadFile(data, filename) {
    let dataString = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
    let anchorElement = document.createElement('a');
    anchorElement.href = dataString;
    anchorElement.download = filename + '.json';
    document.body.appendChild(anchorElement);
    anchorElement.click();
    anchorElement.remove();
}
UtilityMethods_hideElements = function (elementType, diagramType) {
    var diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
    if (diagramContainer.classList.contains(elementType)) {
        if (!(diagramType === 'mindmap-diagram')) {
            diagramContainer.classList.remove(elementType);
        }
    }
    else {
        diagramContainer.classList.add(elementType);
    }
    if (diagramType) {
        diagramContainer.classList.remove(elementType);
    }
    window.dispatchEvent(new Event('resize'));
};
function hideMenubar() {
    UtilityMethods_hideElements('hide-menubar');
}

function click() {
    document.getElementById('UploadFiles').click();
}
function hideElements(elementType) {
    var diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
    if (diagramContainer.classList.contains(elementType)) {
        diagramContainer.classList.remove(elementType);
    } else {
        diagramContainer.classList.add(elementType);
    }
}

function getElementFromPoint(x, y) {
    return document.elementFromPoint(x, y);
}
function click() {
    document.getElementById('defaultfileupload').click();
}

UtilityMethods_native = function (object) {
    var selectedItems = JSON.parse(object);    
    console.log(selectedItems);
};
function pageSizeUpdate() {
    window.dispatchEvent(new Event('resize'));
}

window.downloadPdf = function downloadPdf(base64String, fileName) {
    var sliceSize = 512;
    var byteCharacters = atob(base64String);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);

        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {
        type: 'application/pdf'
    });
    var blobUrl = window.URL.createObjectURL(blob);
    this.triggerDownload("PDF", fileName, blobUrl);
}

triggerDownload: function triggerDownload(type, fileName, url) {
    var anchorElement = document.createElement('a');
    anchorElement.download = fileName + '.' + type.toLocaleLowerCase();
    anchorElement.href = url;
    anchorElement.click();
}
function getViewportBounds() {
    var bounds = document.getElementsByClassName('e-control e-diagram e-lib e-droppable e-tooltip')[0].getBoundingClientRect();
    return { width: bounds.width, height: bounds.height };

}
window.preventTabDefault = function (textareaId, dotnetRef) {
    const textarea = document.getElementById(textareaId);
    if (textarea)
        textarea.addEventListener('keydown', function (e) {
            const spaceSize = 5;
            const spaces = ' '.repeat(spaceSize);
            const tabCharacter = '\t';
            const isTab = this.value.includes(tabCharacter);
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const value = this.value;

                // Find the current line starting position
                const lineStart = value.lastIndexOf('\n', start - 1) + 1;
                const lineEnd = value.indexOf('\n', start);
                const lineContent = value.substring(lineStart, lineEnd === -1 ? value.length : lineEnd);

                if (e.shiftKey) {
                    // Removing indentation
                    if (lineContent.startsWith(isTab ? tabCharacter : spaces)) {
                        const removeLength = isTab ? 1 : spaces.length;
                        this.value = value.substring(0, lineStart) + value.substring(lineStart + removeLength);
                        this.selectionStart = this.selectionEnd = start - removeLength;
                    }
                } else {
                    // Adding indentation
                    const indent = isTab ? tabCharacter : spaces;
                    this.value = value.substring(0, lineStart) + indent + value.substring(lineStart);
                    this.selectionStart = this.selectionEnd = start + indent.length;
                }
                dotnetRef.invokeMethodAsync('UpdateTextValue', this.value);
            }
            else if (e.key === 'Enter') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;

                // Getting current line's indentation
                const currentLineStart = this.value.lastIndexOf('\n', start - 1) + 1;
                const currentLineIndentation = this.value.substring(currentLineStart, start).match(/^\s*/)[0];

                // Insert a newline followed by the current line's indentation
                const newText = '\n' + currentLineIndentation;
                this.value = this.value.substring(0, start) + newText + this.value.substring(end);

                // Updating cursor position
                this.selectionStart = this.selectionEnd = start + newText.length;
                dotnetRef.invokeMethodAsync('UpdateTextValue', this.value);
            } else if (e.key === 'Backspace') {
                const start = this.selectionStart;
                const end = this.selectionEnd;
                const currentLineStart = this.value.lastIndexOf('\n', start - 1) + 1;
                const currentLineIndentation = this.value.substring(currentLineStart, start);

                if (currentLineIndentation.endsWith(spaces)) {
                    e.preventDefault();
                    // Removing indentation level
                    this.value = this.value.substring(0, start - spaceSize) + this.value.substring(end);
                    this.selectionStart = this.selectionEnd = start - spaceSize;
                    dotnetRef.invokeMethodAsync('UpdateTextValue', this.value);
                }
            }
    });
}