<?php

namespace App\Http\Controllers;

use App\Models\Bitacoras;
use App\Models\Paginas;
use Illuminate\Http\Request;

class PaginasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pages = Paginas::all();
        return response()->json(['paginas' => $pages]);
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
            'nombre' => 'required',
            'url' => 'required',
            'descripcion' => 'required',
            'icono' => 'nullable|string',
            'fecha' => 'nullable|date',

        ]);

        $page = Paginas::create($request->all());
        $bitacora = Bitacoras::add("New page with id: {$page->id}");

        if(!$bitacora){
            throw new \Exception("Could not create");
        }

        return response()->json(['message' => 'Page created successfully', 'paginas' => $page], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()],500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Paginas $paginas)
    {
        return response()->json(['paginas' => $paginas]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paginas $paginas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paginas $id)
    {
        try {
            $request->validate([
            'nombre' => 'required',
            'url' => 'required',
            'descripcion' => 'required',
            'icono' => 'nullable|string',
            'fecha' => 'nullable|date',
        ]);
        $paginas = Paginas::findOrFail($id);
        $paginas->update($request->all());

        $bitacora = Bitacoras::add("Paginas with the id {$paginas->id} was update");

        if(!$bitacora){
            throw new \Exception('Error creating.');
        }

        return response()->json(['message' => 'Page updated successfully', 'paginas' => $paginas]);
        } catch (\Throwable $th) {
           return response()->json(['message' => $th->getMessage()], 500);
        }

        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paginas $id)
    {
        try {
            $paginas = Paginas::findOrFail($id);
            $paginas->delete();

        $bitacora = Bitacoras::add("Paginas with the id {$id} was delete");

        if(!$bitacora){
            throw new \Exception('Error creating.');
        }
        return response()->json(['message' => 'paginas deleted successfully']);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
       
    }
}
