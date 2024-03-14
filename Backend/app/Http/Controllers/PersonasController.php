<?php

namespace App\Http\Controllers;

use App\Models\Personas;
use Illuminate\Http\Request;

class PersonasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $personas = Personas::all();
        return response()->json(['personas' => $personas], 200);
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
        $request->validate([
            'primer_nombre' => 'required',
            'segundo_nombre' => 'required',
            'primer_apellido' => 'required',
            'segundo_apellido' => 'required',

        ]);

        $personas = Personas::create($request->all());

        return response()->json(['message' => 'Persona creada con éxito', 'personas' => $personas], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $persona = Personas::find($id);
        if (!$persona) {
            return response()->json(['error' => 'Persona no encontrada'], 404);
        }
        return response()->json(['persona' => $persona], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Personas $personas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'primer_nombre' => 'required',
            'primer_apellido' => 'required',
        ]);

        $persona = Personas::find($id);
        if (!$persona) {
            return response()->json(['error' => 'Persona no encontrada'], 404);
        }

        $persona->update($request->all());

        return response()->json(['message' => 'Persona actualizada con éxito', 'persona' => $persona], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $persona = Personas::find($id);
        if (!$persona) {
            return response()->json(['error' => 'Persona no encontrada'], 404);
        }

        $persona->delete();

        return response()->json(['message' => 'Persona eliminada con éxito'], 200);
    }
}
