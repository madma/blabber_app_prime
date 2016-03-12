# Blabber

:tada:

1. Make all of the blabs show up on the page (**LOAD** blabs).
2. Make only one blab show up on the page (**FETCH** a blab).
3. Create a new blab (**GENERATE** a blab).
4. Remove a blab (**REMOVE** a blab).
5. Edit and save a blab (**CHANGE** a blab).

| Ajax Action  | Information* | Route   | Method   | Path         | After           |
|:------------:|:------------:|:-------:|:---------|:-------------|:---------------:|
| **LOAD**     |              | INDEX   | `GET`    | `/blabs/`    | forEach: render |
| **FETCH**    | id           | SHOW    | `GET`    | `/blabs/:id` | render          |
| **GENERATE** | data         | CREATE  | `POST`   | `/blabs/`    | render          |
| **REMOVE**   | id, el       | DESTROY | `DELETE` | `/blabs/:id` | remove          |
| **CHANGE**   | id, data, el | UPDATE  | `PUT`**  | `/blabs/:id` | re-render***    |

> __*__   – all of them need to know the *resource* type   
> __**__  – or `PATCH`  
> __***__ – remove and render  
