import faker from "faker";
import { Player, Message } from "../app-data/types";

export const fakeId = () => faker.random.uuid();
export const fakeName = () => faker.name.findName();
export const fakeMessage = (): Message => ({ id: fakeId(), content: faker.lorem.sentence() });
export const fakePlayer = (): Player => ({ id: fakeId(), name: fakeName() });
export const fakeMe (): Player => ({ id: 'thisOneIsMine', name: 'nourse' });