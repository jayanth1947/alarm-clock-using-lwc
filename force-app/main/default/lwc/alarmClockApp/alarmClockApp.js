import { LightningElement } from 'lwc';

// This import is used for importing the static resources
import AlarmClockAssest from '@salesforce/resourceUrl/AlarmClockAssets';

export default class AlarmClockApp extends LightningElement {

    // Assiging the static resource to the variables 
    clockImage=AlarmClockAssest+'/AlarmClockAssets/clock.png'
    ringtone= new Audio(AlarmClockAssest+'/AlarmClockAssets/Clocksound.mp3')

    //This Variable is used for storing the current time
    currentTime=''

    // These are used for storing the values in the form of array
    hours=[]
    minutes=[]
    meridians=["AM","PM"]

    // These are used for setting for the alarm when the button is enabled
    alarmTime
    isAlarmSet=false
    isAlarmTriggered=false

    // These are used when the options are selected from the dropdown
    hourSelected
    minuteSelected
    meridianSelected

    // Getter method to determine whether the required fields have been selected or not.
    get isFieldNotSelected(){
        return !(this.hourSelected && this.minuteSelected && this.meridianSelected)
    }

    // Getter method to determine whether the image should be shaking or not.
    get shakeImage(){
        return this.isAlarmTriggered ? 'shake':''
    }

    // Method to be executed after the component is inserted into the DOM.
    connectedCallback(){
        this.currentTimeHandler()
        this.createHoursOption()
        this.createMinutessOption()
    }

    // Method to update the current time every second.
    currentTimeHandler(){

        setInterval(()=>{
        
        // These are used for getting the current time
        let dateTime=new Date()
        let hours=dateTime.getHours()
        let minutes=dateTime.getMinutes()
        let seconds=dateTime.getSeconds()

        // used for the meridian
        let ampm="AM"

        // If the hour is equal to 0, it means that it's 12:00 midnight
        // Therefore, assign the hours to 12 instead of 0
        if(hours==0){
            hours=12
        }

        // If hours is greater than or equal to 12, it means that it's in the afternoon or evening
        else if(hours>=12){
            hours=hours-12
            ampm="PM"
        }

        // Adding a zero in front of hours, minutes, and seconds if the value is less than 10
        hours=hours<10 ? "0"+hours :hours
        minutes=minutes<10  ? "0"+minutes :minutes
        seconds=seconds<10 ? "0"+seconds: seconds

         // Setting the currentTime property with the current time and meridian
        this.currentTime=`${hours}:${minutes}:${seconds} ${ampm}`

        // Checking if the current time matches the alarm time
        if(this.alarmTime===`${hours}:${minutes} ${ampm}`){
           // console.log("Alarm Triggered");
           // Setting the isAlarmTriggered property to true
            this.isAlarmTriggered=true

            // Playing the alarm sound
            this.ringtone.play()

            // Looping the alarm sound until it's turned off
            this.ringtone.loop=true
        }
        },1000) // Running the function every 1 second
        
    }

    // This method creates the hours option and sets the hour value
    createHoursOption(){

        // Loop through hours from 1 to 12
        for(let hour=1;hour<=12;hour++){

            // If hour is less than 10 then add 0 prefix to it else take the hour value
            let val=hour<10 ? "0"+hour :hour

            // Add the value to hours array
            this.hours.push(val)
        }
    }

    // This method creates the minutes option and sets the minutes value
    createMinutessOption(){

        // Loop through minutes from 0 to 59
        for(let minute=0;minute<=59;minute++){

            // If minute is less than 10 then add 0 prefix to it else take the minute value
            let val=minute<10 ? "0"+minute :minute

            // Add the value to minutes array
            this.minutes.push(val)
        }
    }

    // This method handles the change event from the dropdown components
    optionHandler(event){

        // Get the label and selected value from the event detail object
        const {label,value}=event.detail

        // Check which dropdown is selected and assign the selected value to the corresponding property
        if(label==="Hour(s)"){
            this.hourSelected=value
        }
        else if(label==="Minute(s)"){
            this.minuteSelected=value
        }
        else if(label==="AM/PM"){
            this.meridianSelected=value
        }
        else{}  // If none of the above condition matches, do nothing

        //console.log(this.hourSelected);
        //console.log(this.minuteSelected);
        // console.log(this.meridianSelected);
    }

    // This method is used for triggering the alarm
    handleButton(){

        // Concatenate the selected hour, minute and meridian into a formatted string
        this.alarmTime= `${this.hourSelected}:${this.minuteSelected} ${this.meridianSelected}`

        // Set the isAlarmSet variable to true
        this.isAlarmSet=true
    }

    // This is used for clearing the dropdown and stop the alarm
    clearButton(){

        this.alarmTime=''
        this.isAlarmSet=true
        this.isAlarmTriggered=false

        // Pause the ringtone
        this.ringtone.pause()

         // Get all the clock dropdown elements and reset them
        const elements=this.template.querySelectorAll('c-clock-dropdown')

        /*The Array.from() method creates a new, shallow-copied Array instance from an array-like 
        or iterable object. In this case, it is used to convert the NodeList returned by the querySelectorAll
         method to an array.*/
        Array.from(elements).forEach(element=>{
            element.reset("")
        })
        
    }
}