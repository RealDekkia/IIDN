var charLookup = {};

function init() {
    document.getElementById("startButton").onclick = function () {
        document.getElementById("textInputSpan").style.display = "none";
        resetLookup()
        processInputData();
    }
}

function resetLookup() {
    const charLookupInit = {
        A: "",
        B: "",
        C: "",
        D: "",
        E: "",
        F: "",
        G: "",
        H: "",
        I: "",
        J: "",
        K: "",
        L: "",
        M: "",
        N: "",
        O: "",
        P: "",
        Q: "",
        R: "",
        S: "",
        T: "",
        U: "",
        V: "",
        w: "",
        X: "",
        Y: "",
        Z: ""
    };
    charLookup = charLookupInit;
}

function processInputData() {
    var inputData = document.getElementById("inputTextField").value;
    inputData = inputData.split("\n");

    inputData.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

    var decryptionBox = document.getElementById("decryptionBox");
    decryptionBox.innerHTML = "";

    inputData.forEach(line => {
        if (line != "") {
            //Create first line with "normal" text
            decryptionBox.appendChild(createLetterInputBoxesFromText(line));
            decryptionBox.appendChild(document.createElement("hr"));
        }
    });

    var resetButton = document.createElement("button");
    resetButton.innerHTML = "Reset";
    resetButton.onclick = function () {
        resetLookup();
        updateInputsFromCharLookup();
    };
    decryptionBox.appendChild(resetButton);

    var exportButton = document.createElement("button");
    exportButton.innerHTML = "Export";
    exportButton.onclick = function () {
        var outStr = "";
        Array.from(document.getElementsByTagName("input")).forEach(d => {
            if (d.classList.contains("inputField")) {
                if (d.classList.contains("lineBreak")) {
                    outStr += "\n";
                } else {
                    if (d.value.length > 0) {
                        outStr += d.value;
                    } else {
                        outStr += " ";
                    }
                }

            }
        });
        var out = document.getElementById("outputbox");
        out.innerHTML = "";

        var txtBox = document.createElement("textarea");
        txtBox.contentEditable = false;
        txtBox.readOnly = true;
        txtBox.value = outStr;
        out.appendChild(txtBox);
    };
    decryptionBox.appendChild(exportButton);
}

function unfocusAll() {
    Array.from(document.getElementsByTagName("input")).forEach(d => {
        d.classList.remove("infocus");
    });
}

function updateInputsFromCharLookup() {
    Array.from(document.getElementsByTagName("input")).forEach(d => {
        if (d.classList.contains("inputField")) {
            try {
                d.value = charLookup[d.getAttribute("origValue").toUpperCase()].toUpperCase();
            } catch (err) { }
        }
    });
}

function createLetterInputBoxesFromText(txt, enabled) {
    var txtArr = txt.split("");

    var retDiv = document.createElement("div");

    var firstLine = document.createElement("div");
    retDiv.appendChild(firstLine);

    var secondLine = document.createElement("div");
    retDiv.appendChild(secondLine);

    txtArr.forEach(char => {
        var charBox1 = document.createElement("input");
        var charBox2 = document.createElement("input");

        charBox1.disabled = true;
        charBox2.maxLength = 1;

        charBox2.classList.add("inputField");
        charBox2.setAttribute("origValue", char);

        charBox1.value = char;

        //non-letter chars are always the same
        const regex = /^[a-z]+$/i;
        if (!regex.test(char)) {
            charBox2.value = char;
            charBox2.disabled = true;
        }

        charBox2.onfocus = function () {
            unfocusAll();
            charBox1.classList.add("infocus");
        }

        charBox2.oninput = function () {
            charLookup[char.toUpperCase()] = charBox2.value;
            updateInputsFromCharLookup();
        }

        firstLine.appendChild(charBox1);
        secondLine.appendChild(charBox2);
    });

    var lineBreakInput = document.createElement("input");
    lineBreakInput.style.display = "none";
    lineBreakInput.classList.add("inputField", "lineBreak");
    secondLine.appendChild(lineBreakInput);

    return retDiv;
}

init();