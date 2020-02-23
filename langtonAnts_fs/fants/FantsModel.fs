namespace Fants

module public Ants =

    type AntColour =
        | BLACK
        | WHITE

    type AntDirection =
        | NORTH = 1
        | EAST = 2
        | SOUTH = 3
        | WEST = 4

    let private turnRight (dir: AntDirection) = enum<AntDirection> <| (int dir % 4 + 1)
    let private turnLeft (dir: AntDirection) = enum<AntDirection> <| (int dir + 2) % 4 + 1

    type Ant =
        { Longitude: int
          Latitude: int
          Direction: AntDirection }

        static member Create latitude longitude direction =
            { Longitude = longitude
              Latitude = latitude
              Direction = direction }

        member ant.Move colour =
            let direction =
                match colour with
                | BLACK -> turnLeft ant.Direction
                | WHITE -> turnRight ant.Direction

            let longitude =
                match direction with
                | AntDirection.WEST -> ant.Longitude - 1
                | AntDirection.EAST -> ant.Longitude + 1
                | _ -> ant.Longitude

            let latitude =
                match direction with
                | AntDirection.SOUTH -> ant.Latitude - 1
                | AntDirection.NORTH -> ant.Latitude + 1
                | _ -> ant.Latitude

            Ant.Create latitude longitude direction

    type World(initialize: int -> int -> AntColour) =
        let mutable squares = Map<int, Map<int, AntColour>> []
        let mutable ant = Ant.Create 0 0 AntDirection.NORTH
        member this.Ant = ant

        member this.SetColour x y colour =
            let xmap =
                match squares.TryFind(x) with
                | None -> Map<int, AntColour> [ y, colour ]
                | Some m -> m.Add(y, colour)
            squares <- squares.Add(x, xmap)

        member this.GetColour x y =
            let colour =
                squares.TryFind(x)
                |> Option.map (fun m -> m.TryFind(y))
                |> Option.flatten
            match colour with
            | Some c -> c
            | None ->
                let c = initialize x y
                this.SetColour x y c
                c

        member this.Next _ =
            let flip colour =
                match colour with
                | WHITE -> BLACK
                | BLACK -> WHITE

            let oldColour = this.GetColour this.Ant.Latitude this.Ant.Longitude
            this.SetColour this.Ant.Latitude this.Ant.Longitude (flip oldColour)
            ant <- this.Ant.Move oldColour
