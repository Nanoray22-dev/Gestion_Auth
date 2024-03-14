<?php

namespace App\Http\Controllers;

use App\Models\Bitacoras;
use App\Models\Roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Roles::all();
        return response()->json(['roles' => $roles]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    try {
        $request->validate([
            'rol' => 'required',
        ]);
        $rol = Roles::create($request->all());
        $bitacora = Bitacoras::add("new rol was created with id {$rol->id} ");

        if(!$bitacora){
            throw new \Exception('Error creating.');
        }
        return response()->json(['message' => 'Role successfully', 'role' => $rol]);
    
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    

    
}

    /**
     * Display the specified resource.
     */
    public function show(Roles $id)
    {
        $rol = Roles::findOrFail($id);
        return response()->json($rol);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Roles $roles)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Roles $id)
    {
        try {
            $request->validate([
                "rol"=> "required|unique:roles,rol". $id,
            ]);

            $role = Roles::findOrFail($id);
            $role->update($request->all());
            $bitacora = Bitacoras::add("a rol with id {$role->id} was updated");
            if(!$bitacora){
                throw new \Exception('Error creating.');
            }
            return response()->json(['message' => 'Role updated successfully', 'role' => $role]);

        } catch (\Exception $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Roles $id)
    {   try {
        $role = Roles::findOrFail($id);
        $role->delete();
        $bitacora = Bitacoras::add("a rol with id {$id} was deleted");
            if(!$bitacora){
                throw new \Exception('Error creating.');
            }
        return response()->json(['message' => 'Role deleted successfully']);


    } catch (\Exception $th) {
        return response()->json(['error' => $th->getMessage()], 500);
    }
       
    }
}
