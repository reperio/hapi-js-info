# hapi-js-info
A server that logs incoming requests to any path for the purposes of debugging or investigating other applications. 

## Running the Project
Server can be started with the command: `yarn start`

## Overrideable Properties
Environment variables that can be customized  

| Variable Name      | Type    | Default Value  | Description          |  
|--------------------|---------|----------------|----------------------|  
| HAPI_JS_INFO_HOST  | string  | '0.0.0.0'      | HapiJS host binding  |  
| HAPI_JS_INFO_PORT  | number  | 3000           | HapiJS port binding  |  

## Example Request Log
```json
{
    "query": {
        "example_query_param": "\"test param\""
    },
    "payload": null,
    "headers": {
        "example_header": "Test Header",
        "cache-control": "no-cache",
        "postman-token": "1c856220-c6f7-4f4b-badd-7e194c5cb85d",
        "user-agent": "PostmanRuntime/7.4.0",
        "accept": "*/*",
        "host": "localhost:3000",
        "accept-encoding": "gzip, deflate",
        "connection": "keep-alive"
    },
    "path": "/example/path/example_param/",
    "method": "get",
    "info": {
        "received": 1543675960068,
        "remoteAddress": "127.0.0.1",
        "remotePort": 49768,
        "referrer": "",
        "host": "localhost:3000",
        "hostname": "localhost",
        "id": "1543675960068:dev-machine.local:58253:jp5kt3ir:10000",
        "acceptEncoding": "gzip",
        "cors": null,
        "responded": 0
    },
    "level": "info",
    "message": "New request",
    "timestamp": "2018-12-01T14:52:40.071Z"
}
```

## Tests
Tests are written with jest and can be run with `yarn test`
