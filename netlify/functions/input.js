exports.handler = async function(event, context) {
    console.log(event)
    return {
        statusCode: 200,
        body: JSON.stringify({message: JSON.stringify(event.body)})
    };
}