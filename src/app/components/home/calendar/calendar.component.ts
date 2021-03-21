import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CalendarOptions, EventChangeArg, EventHoveringArg, FullCalendarComponent} from '@fullcalendar/angular';
import {Todo} from '../../../model/todo';
import {TodoService} from '../../../services/todo.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None
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
    dayPopoverFormat: {month: 'long', day: 'numeric', year: 'numeric', weekday: 'long'},
    // eventStartEditable: true,
    eventMouseEnter: this.onMouseEnter.bind(this),
    eventDurationEditable: true,
    eventChange: this.onEventChange.bind(this),
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

  constructor(private todoService: TodoService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;

      // add events;
      data.forEach(todo => {
        this.calendar.getApi().addEvent({
          id: todo.id.toString(),
          title: todo.title,
          start: todo.created,
          end: todo.dueDate,
          color: this.randomColor()
        });
      });

      // this.loaded = true;
    });
  }

  onMouseEnter(arg: EventHoveringArg) {
    const todo = this.todos.find(t => t.id.toString() === arg.event.id);

    arg.el.setAttribute('tooltip', this.todoToString(todo));
    arg.el.setAttribute('tooltip-pos', 'top-right');
  }

  private todoToString(todo: Todo) {
    const title = todo.title;
    const created = new Date(todo.created).toUTCString();
    const lastUpdated = new Date(todo.lastUpdated).toUTCString();
    const due = new Date(todo.dueDate).toUTCString();
    const prio = todo.priority;
    const state = todo.state;
    return `Title:  ${title}\nCreated:  ${created}\nLast updated:  ${lastUpdated}\nDue:  ${due}\nPriority:  ${prio}\nState:  ${state}`;
  }

  onEventChange(arg: EventChangeArg) {
    this.todoService.updateTodo(+arg.event.id, {
      dueDate: arg.event.end,
      state: null,
      priority: null,
      description: null,
      title: null
    }).subscribe(
      todo => {
        this.toastrService.success(`Todo #${todo.id} updated`);
      }, error => {
        this.toastrService.error(error.error.error);
      }
    );
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
      title: 'event 3',
      start: '2021-03-19T22:50:12.000Z',
      end: '2021-03-20T06:31:11.000Z',
      color: 'red'
    });
  }

  private randomColor() {
    return `#${Math.random().toString(16).substr(-6)}`;
  }
}
