
import EventRepository from "./repository";
import Event from "./models";

export default class EventService {

    /**
     * The event repository
     * @type {EventRepository}
     */
    _eventRepository;

    /**
     *
     * @param {EventRepository} eventRepository
     */
    constructor(eventRepository) {
        this._eventRepository = eventRepository;
    }

    /**
     * Return all events
     * @return {Event[]}
     */
    getEvents() {
        return this._eventRepository.getAll();
    }

    /**
     * Get the first upcomming event
     * @return {null | Event}
     */
    getFirstEvent() {

        //TODO
        let events = this.getEvents();
        console.log("events => ", events);
        if(events.length!==0){
            let firstEvent = events[0];
            console.log("firstEvent => ", firstEvent);

            for(let event of events){
                if(event.getStartTime()<firstEvent.getStartTime()){
                    firstEvent = event;
                    console.log("firstEvent => ", firstEvent);

                }
            }
            return firstEvent;
        }else{
            return {};
        }
        
    }

    /**
     * Get the last upcomming event
     * @return {null | Event}
     */
    getLastEvent() {
        //TODO
        let events = this.getEvents();
        console.log("events => ", events);
        if(events.length!==0){
            let lastEvent = events[0];
            console.log("lastEvent => ", lastEvent);

            for(let event of events){
                if(event.getStartTime()>lastEvent.getStartTime()){
                    lastEvent = event;
                    console.log("lastEvent => ", lastEvent);

                }
            }
            return lastEvent;
        }else{
            return {};
        }
    }

    /**
     * Get the longest event
     * @return {null | Event}
     */
    getLongestEvent() {
        return null; //TODO
    }

    /**
     * get the shortest event
     * @return {null | Event}
     */
    getShortestEvent() {
        return null; //TODO
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     * @return {Event[]}
     */
    hasEventOn(time) {
        let evts = this._eventRepository.getAll();
        return evts.filter(function (e) {
            return time >= e.getStartTime() && time <= e.getEndTime();
        });
    }

    // A implementer en TDD
    /**
     *
     * @param title
     * @return {null | Event}
     */
    getEventByTitle(title) {
        return null
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     */
    isLocationAvailable(time) {
    }

    /**
     * Get current events
     * @return {Event[]}
     */
    getCurrentEvents() {
        let now = Date.now();
        return this.hasEventOn(new Date(now));
    }
    
}