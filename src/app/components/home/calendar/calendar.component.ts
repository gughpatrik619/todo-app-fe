import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';
import {Todo} from '../../../model/todo';
import {TodoService} from '../../../services/todo.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild('calendar') calendar: FullCalendarComponent;

  todos: Todo[] = [];
  loaded = false;

  calendarOptions: CalendarOptions = {
    themeSystem: 'standard',
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay today',
      center: 'title',
      end: 'prevYear,prev,next,nextYear'
    },
    footerToolbar: {
      left: 'listYear,listMonth,listWeek,listDay'
    },
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      listYear: 'Year list',
      listMonth: 'Month list',
      listWeek: 'Week list',
      listDay: 'Day list'
    },
    weekNumberCalculation: 'ISO',
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: true
    },
    navLinks: true,
    initialView: 'dayGridMonth',
    weekNumbers: true,
    showNonCurrentDates: false,
    fixedWeekCount: false,
    dayMaxEvents: 3,
    // selectable: true,
    // select: this.onSelect.bind(this),
    // selectMirror: true,
    selectMinDistance: 10,
    eventTextColor: 'white',
    // eventStartEditable: true,
    eventDurationEditable: true,
    nowIndicator: true,
    // dateClick: this.handleDateClick.bind(this),
    weekends: true,
    // events: [
    //   {
    //     title: 'dummy',
    //     date: '2021-02-22'
    //   },
    //   {
    //     title: 'editable duration',
    //     date: '2021-02-25 08:00',
    //     color: 'black'
    //   },
    //   {
    //     title: 'event 4',
    //     date: '2021-02-25',
    //     // daysOfWeek: [1], // repeats on Mondays
    //     // startRecur: '2021-02-08',
    //     color: 'green',
    //   },
    //   {
    //     title: 'event 3',
    //     start: '2021-02-24',
    //     end: '2021-02-27',
    //     color: 'red'
    //   }
    // ]
  };

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;

      // add events;
      data.forEach(todo => {
        this.calendar.getApi().addEvent({
          title: todo.title,
          start: new Date(todo.created.toString()).toISOString(),
          end: new Date(todo.dueDate.toString()).toISOString(),
          color: this.randomColor()
        });
      });

      // this.loaded = true;
    });
  }

  // todo: do not remove!!!
  // onSelect(info: DateSelectArg) {
  //   console.log(`Start: ${info.start.toDateString()} ${info.start.toTimeString()}`);
  //   console.log(`End:   ${info.end.toDateString()} ${info.end.toTimeString()}`);
  //   console.log(`all-day: ${info.allDay}`);
  //
  //   this.calendar.getApi().addEvent({
  //     title: 'cursor event',
  //     start: info.start.toISOString(),
  //     end: info.end.toISOString(),
  //     allDay: info.allDay,
  //     color: this.randomColor()
  //   });
  // }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
  }

  addEvent() {
    this.calendar.getApi().addEvent({
      title: 'added 1',
      start: '2021-03-30T14:12:07',
      end: '2021-04-01',
      color: this.randomColor()
    });
  }

  private randomColor() {
    return `#${Math.random().toString(16).substr(-6)}`;
  }
}
