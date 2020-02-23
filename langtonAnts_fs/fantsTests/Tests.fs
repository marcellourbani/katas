module FantsTests.Tests

open Expecto
open Fants.Ants

[<Tests>]
let tests =
    testList "fants"
        [ testCase "constructor" <| fun _ ->
            let ant = Ant.Create 1 2 AntDirection.WEST
            Expect.equal ant.Latitude 1 "Latitude should be 1"
            Expect.equal ant.Longitude 2 "Longitude should be 2"
            Expect.equal ant.Direction AntDirection.WEST "Direction should be west"

          testCase "turn" <| fun _ ->
              let mutable ant = Ant.Create 1 2 AntDirection.NORTH
              Expect.equal ant.Direction AntDirection.NORTH "Direction should be North"
              ant <- ant.Move BLACK
              Expect.equal ant.Direction AntDirection.WEST "Direction should be West"
              ant <- ant.Move BLACK
              Expect.equal ant.Direction AntDirection.SOUTH "Direction should be South"
              ant <- ant.Move BLACK
              Expect.equal ant.Direction AntDirection.EAST "Direction should be East"
              ant <- ant.Move BLACK
              Expect.equal ant.Direction AntDirection.NORTH "Direction should be North"

              ant <- ant.Move WHITE
              Expect.equal ant.Direction AntDirection.EAST "Direction should be East"
              ant <- ant.Move WHITE
              Expect.equal ant.Direction AntDirection.SOUTH "Direction should be South"
              ant <- ant.Move WHITE
              Expect.equal ant.Direction AntDirection.WEST "Direction should be West"
              ant <- ant.Move WHITE
              Expect.equal ant.Direction AntDirection.NORTH "Direction should be North"

          testCase "move" <| fun _ ->
              let ant = Ant.Create 1 2 AntDirection.NORTH
              let mutable newant = ant.Move BLACK
              Expect.equal newant.Longitude 1 "Should have moved West"
              Expect.equal newant.Latitude 1 "Should have moved West only"
              newant <- newant.Move BLACK
              Expect.equal newant.Latitude 0 "Should have moved South"
              Expect.equal newant.Longitude 1 "Should have moved South only"

              newant <- ant.Move WHITE
              Expect.equal newant.Longitude 3 "Should have moved East"
              Expect.equal newant.Latitude 1 "Should have moved East only"

          testCase "world creation" <| fun _ ->
              let world = World((fun _ _ -> WHITE))
              Expect.equal (world.GetColour 2 4) WHITE "Should all be white"
              world.SetColour 2 4 BLACK
              Expect.equal (world.GetColour 2 4) BLACK "Should be black now"
              world.SetColour 2 4 WHITE
              Expect.equal (world.GetColour 2 4) WHITE "Should be white again"

          testCase "game" <| fun _ ->
              let world = World((fun _ _ -> WHITE))
              world.Next()
              Expect.equal (world.GetColour 0 0) BLACK "Should be black now"
              Expect.equal (world.Ant.Latitude, world.Ant.Longitude) (0, 1) "Should have moved East"
              world.Next()
              Expect.equal (world.GetColour 0 1) BLACK "Should be black now"
              Expect.equal (world.Ant.Latitude, world.Ant.Longitude) (-1, 1) "Should have moved South"
              world.Next()
              Expect.equal (world.GetColour -1 1) BLACK "Should be black now"
              Expect.equal (world.Ant.Latitude, world.Ant.Longitude) (-1, 0) "Should have moved West"
              world.Next()
              Expect.equal (world.GetColour -1 0) BLACK "Should be black now"
              Expect.equal (world.Ant.Latitude, world.Ant.Longitude) (0, 0) "Should have moved North"

              // back to 0,0 but black now!
              world.Next()
              Expect.equal (world.GetColour 0 0) WHITE "Should be white now"
              Expect.equal (world.Ant.Latitude, world.Ant.Longitude) (0, -1) "Should have moved West"
              world.Next()
              Expect.equal (world.GetColour 0 -1) BLACK "Should be black now"
              Expect.equal (world.Ant.Latitude, world.Ant.Longitude) (1, -1) "Should have moved North"
              world.Next()
              Expect.equal (world.GetColour 0 -1) BLACK "Should be black now"
              Expect.equal (world.Ant.Latitude, world.Ant.Longitude) (1, 0) "Should have moved East"
              world.Next()
              Expect.equal (world.GetColour 1 0) BLACK "Should be black now"
              Expect.equal (world.Ant.Latitude, world.Ant.Longitude) (0, 0) "Should have moved South"

              // back to initial square, opposite direction
              world.Next()
              Expect.equal (world.GetColour 0 0) BLACK "Should be black now"
              Expect.equal (world.Ant.Latitude, world.Ant.Longitude) (0, -1) "Should have moved West" ]
