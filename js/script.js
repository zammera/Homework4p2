/* 
File: script.js 
GUI Assignment:  Creating a Dynamic Multipication table using JS 
Allen Zammer, UMass Lowell Computer Science, allen_zammer@student.uml.edu 
Copyright (c) 2024 by Allen.  All rights reserved.  May be freely copied or 
excerpted for educational purposes with credit to the author. 
updated by AZ on October 30, 2024 at  11:59 PM */

var currentTab = 0;

$(function () {
    $("#xMin").slider({
    range: "min",      // Slider style
    min: -50,         // Minimum value
    max: 50,          // Maximum value
    value: 0,          // Starting value
    slide: function (event, ui) {
        $("#xMin-val").text("Value: " + ui.value); // Update value on slide
        tableCreation();
        updateTextBox();
    },
    });
    // Set initial value display
    $("#xMin-val").text("Value: " + $("#xMin").slider("value"));

    $("#xMinT").on("change keyup", function () {
        let inputValue = parseInt($(this).val());
        $("#xMin").slider("value", inputValue);
        $("#xMin-val").text("Value: " + $("#xMin").slider("value"));
    });
});

$(function () {
    $("#xMax").slider({
    range: "min",      // Slider style
    min: -50,         // Minimum value
    max: 50,          // Maximum value
    value: 0,          // Starting value
    slide: function (event, ui) {
        $("#xMax-val").text("Value: " + ui.value); // Update value on slide
        tableCreation();
        updateTextBox();
    },
    });
    // Set initial value display
    $("#xMax-val").text("Value: " + $("#xMax").slider("value"));

    $("#xMaxT").on("change keyup", function () {
        let inputValue = parseInt($(this).val());
        $("#xMax").slider("value", inputValue);
        $("#xMax-val").text("Value: " + $("#xMax").slider("value"));
    });
});

$(function () {
    $("#yMin").slider({
    range: "min",      // Slider style
    min: -50,         // Minimum value
    max: 50,          // Maximum value
    value: 0,          // Starting value
    slide: function (event, ui) {
        $("#yMin-val").text("Value: " + ui.value); // Update value on slide
        tableCreation();
        updateTextBox();
    },
    });
    // Set initial value display
    $("#yMin-val").text("Value: " + $("#yMin").slider("value"));

    $("#yMinT").on("change keyup", function () {
        let inputValue = parseInt($(this).val());
        $("#yMin").slider("value", inputValue);
        $("#yMin-val").text("Value: " + $("#yMin").slider("value"));
    });
});

$(function () {
    $("#yMax").slider({
    range: "min",      // Slider style
    min: -50,         // Minimum value
    max: 50,          // Maximum value
    value: 0,          // Starting value
    slide: function (event, ui) {
        $("#yMax-val").text("Value: " + ui.value); // Update value on slide
        tableCreation();
        updateTextBox();
    },
    });
    // Set initial value display
    $("#yMax-val").text("Value: " + $("#yMax").slider("value"));

    $("#yMaxT").on("change keyup", function () {let inputValue = parseInt($(this).val());
    $("#yMax").slider("value", inputValue);
    $("#yMax-val").text("Value: " + $("#yMax").slider("value"));
    });
});

$(function () {
    let tabCount = 1;
    
    // Initialize tabs
    $("#tabs").tabs();
    
    // Add tab functionality
    $("#save").on("click", function () {
        currentTab++;
        tabCount++;
        const tabId = `table${tabCount}`;
    
        // Add a new tab header
        const newTabHeader = `<li><a href="#${tabId}">Table ${tabCount}</a></li>`;
        $("#tabs ul").append(newTabHeader);
    
        // Add a new tab content
        const newTabContent = `<div id="${tabId}"><p>Adjust the sliders to make a new table!</p></div>`;
        $("#tabs").append(newTabContent);
    
        // Refresh the tabs widget
        $("#tabs").tabs("refresh");
    
        // Optionally activate the new tab
        $("#tabs").tabs("option", "active", tabCount - 1);

        //clean up the sliders
        $("#xMin").slider("value", 0);
        $("#xMin-val").text("Value: " + 0);
        $("#xMinT").val(0);  

        $("#xMax").slider("value", 0);
        $("#xMax-val").text("Value: " + 0);
        $("#xMaxT").val(0);  

        $("#yMin").slider("value", 0);
        $("#yMin-val").text("Value: " + 0);
        $("#yMinT").val(0);  

        $("#yMax").slider("value", 0);
        $("#yMax-val").text("Value: " + 0);
        $("#yMaxT").val(0);  

    });

    $("#delete").on("click", function () {
        currentTab--;
        tabCount--;
        const tabs = $("#tabs").tabs();
        const activeIndex = tabs.tabs("option", "active");
    
        // Get the tab to remove
        const tabHeaderToRemove = tabs.find("li").eq(activeIndex);
        const tabContentToRemove = tabs.find(".ui-tabs-panel").eq(activeIndex);
    
        // Remove the tab header and content
        tabHeaderToRemove.remove();
        tabContentToRemove.remove();
    
        // Refresh the tabs widget
        tabs.tabs("refresh");
    
        // Adjust active tab index if needed
        if (tabs.find("li").length > 0) {
            tabs.tabs("option", "active", Math.max(0, activeIndex - 1));
        }
        });
});

$(document).ready(function() {
    $('#values').validate({
        rules: {
            xMin : {
                required : true,
                number: true,
                range: [-50, 50]
            },
            xMax : {
                required : true,
                number: true,
                range: [-50, 50]
            },
            yMin : {
                required : true,
                number: true,
                range: [-50, 50]
            },
            yMax : {
                required : true,
                number: true,
                range: [-50, 50]
            },
        }
    })
});

function tableCreation() {
    let xMin = $("#xMin").slider("value");
    let xMax = $("#xMax").slider("value");
    let yMin = $("#yMin").slider("value");
    let yMax = $("#yMax").slider("value");

    var cols = Math.abs(xMax - xMin);
    var rows = Math.abs(yMax - yMin);
    var xVal = [xMin, xMax];
    var yVal = [yMin, yMax];
    
    let table = '<div id="holder"><table id="table">';
    table += '<tr><th id="special"></th>'
    for (let t = xVal[0]; t <= xVal[1]; t++) {
        table+= `<th id="first-row"> ${ t } </th>`;
    }
    table += '</tr>'
    for (let i = 0; i<= rows; i++) {  
        table += '<tr>';  
        for (let j = 0; j <= cols + 1; j++) { 
            if( j == 0){
                table += `<th id="first-col"> ${ i + parseInt(yVal[0]) }</th>`
            } else {
                table += `<td>${(i + parseInt(yVal[0])) * (parseInt(xVal[0]) + j - 1)}</td>`;  
            }
        }  
        table += '</tr>';  
    } 
    table += '</table></div>';
    selector = "#table" +  currentTab; 
    $(selector).html(table);
};

function updateTextBox() {
    let xMin = $("#xMin").slider("value");
    let xMax = $("#xMax").slider("value");
    let yMin = $("#yMin").slider("value");
    let yMax = $("#yMax").slider("value");
    $("#xMinT").val(xMin); 
    $("#xMaxT").val(xMax);    
    $("#yMinT").val(yMin);    
    $("#yMaxT").val(yMax); 
};