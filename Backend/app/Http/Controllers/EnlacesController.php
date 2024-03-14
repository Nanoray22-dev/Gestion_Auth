<?php

namespace App\Http\Controllers;

use App\Models\Enlaces;
use Illuminate\Http\Request;

class EnlacesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $enlaces = Enlaces::all();
        return response()->json($enlaces);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $enlace = Enlaces::create($request->all());
        return response()->json($enlace, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Enlaces $id)
    {
        $enlace = Enlaces::findOrFail($id);
        return response()->json($enlace);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Enlaces $enlaces)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $enlace = Enlaces::findOrFail($id);
        $enlace->update($request->all());
        return response()->json($enlace, 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enlaces $id)
    {

        $enlace = Enlaces::findOrFail($id);
        $enlace->delete();
        return response()->json(null, 204);

    }
}
