import { inject, type App, type InjectionKey } from "vue";
import mitt from "mitt";
import type { TopicModel } from "./models/topic_model";
import type { QuestionModel } from "./models/question_model";

type Events = {
  topicRemove: { topicId: number };
  topicInclude: { topic: TopicModel };
  questionRemove: { questionId: number };
  questionInclude: { question: QuestionModel };
};

type Consumer<T> = (action: T) => void;

export interface EventBus {
  on<T extends keyof Events>(key: T, consumer: Consumer<Events[T]>): void;
  send<T extends keyof Events>(key: T, value: Events[T]): void;
}

const key = Symbol() as InjectionKey<EventBus>;

export function provideEventBus(app: App, value: EventBus): void {
  app.provide(key, value);
}

export function useEventBus(): EventBus {
  return inject(key)!;
}

export class MittEventBus implements EventBus {
  #bus = mitt<Events>();

  on<T extends keyof Events>(key: T, consumer: Consumer<Events[T]>): void {
    this.#bus.on(key, consumer);
  }

  send<T extends keyof Events>(key: T, value: Events[T]): void {
    this.#bus.emit(key, value);
  }
}
