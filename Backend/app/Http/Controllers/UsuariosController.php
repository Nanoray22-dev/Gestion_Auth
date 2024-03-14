<?php

namespace App\Http\Controllers;

use App\Models\Bitacoras;
use App\Models\User;
use App\Models\Usuarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
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
                'email' => 'required|email|unique:users',
            ]);
            if (empty($request->password)) {
                $hashedPassword = Hash::make($request->apellido);
            } else {
                $hashedPassword = Hash::make($request->password);
            }
            $userData = $request->all();
            $userData['password'] = $hashedPassword;
            $user = User::create($userData);

            $bitacora = Bitacoras::add("A new user was created with the id: {$user->id}");

            if (!$bitacora) {
                throw new \Exception();
            }

            // Respuesta JSON con el usuario creado
            return response()->json($user, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al crear el usuario: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Usuarios $usuarios)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required',
                'primer_apellido' => 'required',
                'email' => 'required|email|unique:users,email,' . $id,
                'password' => 'nullable|min:6',
            ]);

            $userData = $request->except('password');


            if ($request->filled('password')) {
                $userData['password'] = Hash::make($request->password);
            }

            $user = User::findOrFail($id);
            $user->update($userData);

            $bitacora = Bitacoras::add("A user with the id {$user->id} was updated.");

            if (!$bitacora) {
                throw new \Exception('Error creating bitacora.');
            }

            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            $bitacora = Bitacoras::add("A user with the id {$user->id} was deleted.");
            if (!$bitacora) {
                throw new \Exception('Error creating.');
            }
            return response()->json(null, 204);
        } catch (\Exception $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function Acceso(Request $request, $id)
    {
        try {
            $request->validate([
                'estado' => 'required|in:activo,inactivo'
            ]);

            $newStatus = $request->input('estado');

            $user = User::findOrFail($id);
            $user->status = $newStatus;
            $user->save();

            $cambios = ($newStatus == 'active') ? 'activo' : 'inactivo';
            $Bitacoras = Bitacoras::add("The user with the id: {$user->id} was $cambios.");

            if (!$Bitacoras) {
                throw new \Exception('Error creating Bitacoras.');
            }

            return response()->json(['message' => 'User status changed successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
