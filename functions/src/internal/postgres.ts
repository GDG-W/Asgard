import { Knex } from "knex";

/**
 * Base row type for postgresql tables
 */
export interface Model {
  /**
   * ID of the row
   */
  id: string;
  /**
   * date the row was created
   */
  created_at: Date;
}

/**
 * Properties for models that need to track updates
 */
export interface Trackable {
  /**
   * timestamp of last update
   */
  updated_at: Date;
}

/**
 * Enable soft delete on a model
 */
export interface Archivable {
  /**
   * timestamp when row was soft deleted, if it has been
   * soft deleted in the first place
   */
  deleted_at: Date;
}

export interface QueryMap {
  [key: string]: (b: Knex.QueryBuilder) => Knex.QueryBuilder;
}

export interface PaginatedQuery {
  limit: number;
  offset: number;
}

export interface PaginatedResult<T> extends Partial<PaginatedQuery> {
  items: T[];
  item_count: number;
}
