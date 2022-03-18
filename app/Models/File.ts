import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public public_id: string;

  @column()
  public name: string;

  @column()
  public type: string;

  @column()
  public src: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
