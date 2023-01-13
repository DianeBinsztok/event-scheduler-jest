import Event from "../src/models";
import EventRepository from "../src/repository";
import EventService from "../src/services";
// jest va simuler le comportement de Repository
jest.mock("../src/repository");


describe("Event Service",()=> {

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        EventRepository.mockClear();
        EventRepository.mockImplementation(() => {
            return {
                //
                getAll: () => fakeEvents.slice()
            }
        });
    });
    // jest envoie des fausses données de repository au test
    let fakeEvents = [
        new Event(new Date('2019-12-17T03:24:00'),new Date('2019-12-17T13:24:00'),"Hello World","Campus Numerique","This is an hello world.."),
        new Event(new Date('2018-12-17T03:24:00'),new Date('1995-12-17T03:24:00'),"First event","Campus Numerique","This is an hello world.."),
        new Event(new Date('2020-04-01T09:00:00'),new Date('2020-04-01T17:00:00'),"Unit test again","Campus Numerique","This is an hello world..")
    ];

    // 1 - getEvents
    test('getEvents shall call repository', async () => {
        let eventService = new EventService(new EventRepository());
        eventService.getEvents();
        expect(EventRepository).toHaveBeenCalledTimes(1);
    })

    test('getEvents shall return 4 result', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEvents().length).toBe(3);
    })

    // 2 - getFirstEvent
    test('getFirstEvent shall return 1 result', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getFirstEvent()).not.toBeInstanceOf(Array);
    })
    test('getFirstEvent shall return an instance of Event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getFirstEvent()).toBeInstanceOf(Event);
    })
    test('getFirstEvent shall return the first event of fakeEvents', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getFirstEvent()).toBe(fakeEvents[1]);
    })

    // 3 - getLastEvent en TDD
    test('getLastEvent shall call repository', async () => {
        let eventService = new EventService(new EventRepository());
        eventService.getLastEvent();
        expect(EventRepository).toHaveBeenCalledTimes(1);
    })
    test('getLastEvent shall return an instance of Event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLastEvent()).toBeInstanceOf(Event);
    })
    test('getLastEvent shall return the first event of fakeEvents', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLastEvent()).toBe(fakeEvents[2]);
    })
    test('getLastEvent shall return the last event of fakeEvents', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLastEvent().title).toBe("Unit test again");
    })
});


// Nouveau contexte: base de donnée vide
describe("Event Service",()=> {

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        EventRepository.mockClear();
        EventRepository.mockImplementation(() => {
            return {
                //
                getAll: () => fakeEvents.slice()
            }
        });
    });
    let fakeEvents = [];

    // 2 - getFirstEvent
    test('getFirstEvent shall return empty object if no events are in DB', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getFirstEvent())=={};
    })

    // 3 - getLastEvent
    test('getLastEvent shall return empty object if no events are in DB', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLastEvent())=={};
    })


});