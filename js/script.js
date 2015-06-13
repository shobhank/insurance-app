/**
 * Created by shsharma on 6/12/15.
 */
jQuery.noConflict();
var insuranceSelected = "";
var i = 1;
var insuredPeople;
location.hash = "home";

function locationHashChanged() {
    if (location.hash === "#home") {
        $("#screenContainer").animate({
            left: "0"
        },200);
    } else if (location.hash === "#limited"){
        $("#screenContainer").animate({
            left: "-490"
        },200);
    } else if (location.hash === "#comprehensive"){
        $("#screenContainer").animate({
            left: "-980"
        },200);
    } else if (location.hash === "#personal"){
        $("#screenContainer").animate({
            left: "-1470"
        },200);
    } else if (location.hash === "#submit"){
        $("#screenContainer").animate({
            left: "-1960"
        },200);
    }
}

window.onhashchange = locationHashChanged;

$("#selectButtonLimited").click(function(){
    $("#screenContainer").animate({
        left: "-490"
    },200);
    location.hash = "limited";
});
$("#selectButtonComprehensive").click(function(){
    $("#screenContainer").animate({
        left: "-980"
    },200);
    location.hash = "comprehensive";
});
$("a[href='home']").click(function(event){
    event.preventDefault();
    $("#screenContainer").animate({
        left: "0"
    },200);
});

$("#limitedPlanA,#limitedPlanB").click(function(){
    $("#screenContainer").animate({
        left: "-1470"
    },200);
    $("#screen4 > .breadcrumb").html('<li><a href="home">Plans</a></li> <li><a href="limitedCoverage">Limited Coverage</a></li> <li class="active">Personal Details</li>');
    $("a[href='limitedCoverage']").click(function(event){
        event.preventDefault();
        $("#screenContainer").animate({
            left: "-490"
        },200);
    });
    $("a[href='home']").click(function(event){
        event.preventDefault();
        $("#screenContainer").animate({
            left: "0"
        },200);
    });
    insuranceSelected = $(this).attr("id");
    location.hash = "personal";
});

$("#comprehensivePlanA,#comprehensivePlanB,#comprehensivePlanC").click(function(){
    $("#screenContainer").animate({
        left: "-1470"
    },200);
    $("#screen4 > .breadcrumb").html('<li><a href="home">Plans</a></li> <li><a href="comprehensiveCoverage">Comprehensive Coverage</a></li> <li class="active">Personal Details</li>');
    $("a[href='comprehensiveCoverage']").click(function(event){
        event.preventDefault();
        $("#screenContainer").animate({
            left: "-980"
        },200);
    });
    $("a[href='home']").click(function(event){
        event.preventDefault();
        $("#screenContainer").animate({
            left: "0"
        },200);
    });
    insuranceSelected = $(this).attr("id");
    location.hash = "personal";
});

$(function() {
    $( "#datepicker1" ).datepicker();
});
$(function() {
    $( "#datepicker2" ).datepicker();
});
$("a[href='addMoreInsured']").click(function(event){
    event.preventDefault();
    var height = (500 + i*200) + "px";
    if(i === 5){
        alert("You cannot add more than 5 members");
        return;
    }
    $("#personalDetails").animate({"height": height},200);
    $("#viewPort").animate({"height": height},200);
    $("#screenContainer").animate({"height": height},200);
    var lastInsured = "#insured" + i;
    $(lastInsured + " .has-error").removeClass("has-error");
    var newInsured = "insured" + (i+1);
    var $lastInsured = $(lastInsured);

    var $insuredInstance = $lastInsured.clone(true);
    $insuredInstance.find("#name").val("");
    $insuredInstance.find("#addressLine1").val("");
    $insuredInstance.find("#addressLine2").val("");

    $insuredInstance.attr("id",newInsured);
    $insuredInstance.find("h5").html("Insured "+ (i+1));
    $lastInsured.after($insuredInstance);
    $lastInsured.after($("<br>"));

    i++;
});
$("a[href='removeInsured']").click(function(event){

    event.preventDefault();
    if(i===1){
        alert("You need atleast one insured member");
        return;
    }
    i--;
    var height = (500 + i*200);
    if(height >= 700) {
        height = height + "px";
        $("#personalDetails").animate({"height": height}, 200);
        $("#viewPort").animate({"height": height}, 200);
        $("#screenContainer").animate({"height": height}, 200);
    }

    var lastInsured = "#insured"+(i+1);
    $(lastInsured).hide();

});

var insureds = [];

$("#submitButton").click(function(){
    if(!validate())
        return;
    $("#screenContainer").animate({
        left: "-1960"
    },200);

    $("#viewPort").animate({"height": 500}, 200);
    $("#screenContainer").animate({"height": 500}, 200);

    insuranceSelected = insuranceSelected.replace(/([a-z])([A-Z])/g, '$1 $2');
    $("#selectedPlan").html("<h5>Thank you for choosing Reliable Insurance! <br>Plan you have selected is " + insuranceSelected + "</h5>");
    var insuredPeople = "<h5>";
    for(j=1;j<=insureds.length;j++)
        insuredPeople = insuredPeople + insureds[j-1].name + "<br>";
    insuredPeople = insuredPeople + "</h5>";
    $("#insuredPeople").html(insuredPeople);
    location.hash = "submit";
});

function validate(){
    for(j = 1;j<=i ; j++){
        pname = $("#insured"+j).find("#name").val();

        if(!pname || pname.length === 0) {
            alert("Name is a required field");
            $("#insured"+j + " .form-horizontal .form-group").first().attr("class","form-group has-error");
            return false;
        }
        paddress = $("#insured"+j).find("#addressLine1").val() + $("#insured"+j).find("#addressLine2").val();
        pstartDate = $("#insured"+j).find("#datepicker1").val();
        if(!pstartDate || pstartDate.length === 0) {
            alert("Start Date is a required field");
            $("#insured"+j + " .form-horizontal .dateP1").first().attr("class","form-group has-error");
            return false;
        }
        pendDate = $("#insured"+j).find("#datepicker1").val();
        if(!pendDate || pendDate.length === 0) {
            alert("End Date is a required field");
            return false;
        }
        insured = {
            name : pname,
            address:paddress,
            startDate:pstartDate,
            endDate:pendDate};
        insureds.push(insured);
    }
    return true;
}