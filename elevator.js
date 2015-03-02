{
    init: function(elevators, floors) {
        var idleElevators = [];

        var updateQueue =  function(elevator, floor) {
            var queue = elevator.destinationQueue;
            // If the floor is already in the queue, don't add it
            if (queue.indexOf(floor) != -1)
                return;

            queue.sort();
            // Find the right spot for the new floor
            var idx = 0;
            for(; idx < queue.length; idx++)
            {
                if (queue[idx] > floor)
                    break;
            }

            // Insert the new floor into the queue
            var newQueue = queue.slice(0);
            newQueue.length += 1;
            var next = floor;
            for(; idx < newQueue.length; idx++)
            {
                var temp = next;
                next = newQueue[idx];
                newQueue[idx] = temp;
            }
            elevator.destinationQueue = newQueue;
            elevator.checkDestinationQueue();
        };

        elevators.map( function (elevator) {
            elevator.on("floor_button_pressed", function(floorNum) {
                updateQueue(elevator, floorNum);
            });
            elevator.on("idle", function() {
                idleElevators.push(elevator);
            });
        });

        floors.map( function(floor) {
            floor.on("up_button_pressed", function() {
                var e = idleElevators.length == 0 ? elevators[0] : idleElevators.pop();
                e.goToFloor(floor.floorNum());

            });
            floor.on("down_button_pressed", function() {
                var e = idleElevators.length == 0 ? elevators[1] : idleElevators.pop();
                e.goToFloor(floor.floorNum());
            });
        });
    },
    update: function(dt, elevators, floors) {
        elevators.map( function (elevator) {
            console.log("elevator currentFloor = " + elevator.currentFloor() 
                        + ", queue: '" + elevator.destinationQueue + "'");
        });   
    }
}

