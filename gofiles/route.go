package main
import (
    "log"
    "net/http"

    "github.com/labstack/echo/v5"
    "github.com/pocketbase/pocketbase"
    "github.com/pocketbase/pocketbase/core"
)

app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
    e.Router.GET("/hellogo/:name", func(c echo.Context) error {
        name := c.PathParam("name")

        return c.JSON(http.StatusOK, map[string]string{"message": "Hello " + name})
    }, /* optional middlewares */)

    return nil
})
